using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Serialization;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace DemoWebApi.Controllers
{
	/// <summary>
	/// Heroes operations. Decorated by nullable directive.
	/// </summary>
	//[ApiController] for opt-in without ApiExplorerVisibilityEnabledConvention
	[ApiController]
	[Route("api/[controller]")]
	[ApiExplorerSettings(IgnoreApi = false)] // to test opt-in of exposing controller.
	public class HeroesController : ControllerBase
	{
		/// <summary>
		/// Get all heroes.
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[ActionName("GetHeroes")]
		public Hero[] Get()
		{
			return HeroesData.Instance.Dic.Values.ToArray();
		}

		/// <summary>
		/// Get a hero. Nullable reference. MaybeNull
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet("{id}")]
		[ActionName("GetHero")]
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		public Hero Get(long id)
		{
			_ = HeroesData.Instance.Dic.TryGetValue(id, out Hero r);
			return r;
		}

		/// <summary>
		/// MaybeNull
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet("super")]
		[ActionName("GetSuperHero")]
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		public SuperHero GetSuper([FromQuery] long id)
		{
			_ = HeroesData.Instance.Dic.TryGetValue(id, out Hero r);
			return r as SuperHero;
		}

		[HttpDelete("{id}")]
		public void Delete(long id)
		{
			_ = HeroesData.Instance.Dic.TryRemove(id, out _);
		}

		/// <summary>
		/// Add a hero. The client will not expect null. NotNull
		/// </summary>
		/// <param name="name">name of hero</param>
		/// <returns>Always object.</returns>
		[HttpPost("q")]
		[return: System.Diagnostics.CodeAnalysis.NotNull]
		public Hero PostWithQuery([FromQuery] string name)//.net core difference: requires explicit decorattion. Also the path can not be identical to any existing one.
		{
			return CreateHero(name);
		}

		[HttpPost]
		public Hero Post([FromBody] string name)
		{
			return CreateHero(name);
		}

		[return: System.Diagnostics.CodeAnalysis.NotNull]
		static Hero CreateHero(string name)
		{
			long max = HeroesData.Instance.Dic.Keys.Max();
			Hero hero = new Hero(max + 1, name);
			hero.PhoneNumbers.Add(new DemoData.PhoneNumber { FullNumber = "33242343242", PhoneType = DemoData.PhoneType.Tel });
			hero.PhoneNumbers.Add(new DemoData.PhoneNumber { FullNumber = "0898sdf43434", PhoneType = DemoData.PhoneType.Mobile });
			hero.Address = new DemoData.Address
			{
				City="Brisbane",
				State="Queensland",
				Country="Australia"
			};

			_ = HeroesData.Instance.Dic.TryAdd(max + 1, hero);
			return hero;
		}

		/// <summary>
		/// Update hero.
		/// </summary>
		/// <param name="hero"></param>
		/// <returns></returns>
		[HttpPut]
		public Hero Put([FromBody] Hero hero)
		{
			HeroesData.Instance.Dic[hero.Id] = hero;
			return hero;
		}

		/// <summary>
		/// Search heroes
		/// </summary>
		/// <param name="name">keyword contained in hero name.</param>
		/// <returns>Hero array matching the keyword.</returns>
		[HttpGet("search/{name}")]
		public Hero[] Search(string name)
		{
			ICollection<Hero> values = HeroesData.Instance.Dic.Values;
			return values.Where(d => d.Name.Contains(name)).ToArray();
		}

		[HttpGet("asyncHeroes")]
		public async IAsyncEnumerable<Hero> GetAsyncHeroes()
		{
			foreach (Hero item in HeroesData.Instance.Dic.Values)
			{
				await System.Threading.Tasks.Task.Delay(1);
				yield return item;
			}
		}

	}

	/// <summary>
	/// Complex hero type
	/// </summary>
	[DataContract(Namespace = DemoWebApi.DemoData.Constants.DataNamespace)]
	public class Hero
	{
		public Hero(long id, string name)
		{
			Id = id;
			Name = name;
			PhoneNumbers = new List<DemoWebApi.DemoData.PhoneNumber>();
		}

		[DataMember]
		public long Id { get; set; }

		[DataMember]
		[Required]
		[StringLength(120, MinimumLength = 2)]
		public string Name { get; set; }

		[DataMember]
		public DateOnly DOB { get; set; }

		[DataMember]
		public DateOnly? Death { get; set; }

		[DataMember]
		[EmailAddress]
		public string EmailAddress { get; set; }

		[DataMember]
		public DemoWebApi.DemoData.Address Address { get; set; }

		[DataMember]
		[MinLength(6)] //just for testing multiple validations
		[RegularExpression(@"https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)")]
		public string WebAddress { get; set; }


		[DataMember]
		public virtual IList<DemoWebApi.DemoData.PhoneNumber> PhoneNumbers { get; set; }
	}

	[DataContract(Namespace = DemoWebApi.DemoData.Constants.DataNamespace)]
	public class SuperHero: Hero
	{
		public SuperHero(long id, string name, bool super):base(id, name)
		{
			Id = id;
			Name = name;
			Super = super;
		}

		[DataMember]
		public bool Super { get; set; }

	}

	//public sealed class HeroesData
	//{
	//	public ConcurrentDictionary<long, Hero> Dic { get; private set; }

	//	private HeroesData()
	//	{
	//		Dic = new ConcurrentDictionary<long, Hero>(new KeyValuePair<long, Hero>[] {
	//			new KeyValuePair<long, Hero>(11, new Hero(11, "Mr. Nice")),
	//			new KeyValuePair<long, Hero>(12, new Hero(12, "Narco")),
	//			new KeyValuePair<long, Hero>(13, new Hero(13, "Bombasto")),
	//			new KeyValuePair<long, Hero>(14, new Hero(14, "Celeritas")),
	//			new KeyValuePair<long, Hero>(15, new Hero(15, "Magneta")),
	//			new KeyValuePair<long, Hero>(16, new Hero(16, "RubberMan")),
	//			new KeyValuePair<long, Hero>(17, new Hero(17, "Dynama")),
	//			new KeyValuePair<long, Hero>(18, new Hero(18, "Dr IQ")),
	//			new KeyValuePair<long, Hero>(19, new Hero(19, "Magma")),
	//			new KeyValuePair<long, Hero>(20, new Hero(29, "Tornado")),

	//			});
	//	}

	//	public static HeroesData Instance { get { return Nested.instance; } }

	//	private class Nested
	//	{
	//		// Explicit static constructor to tell C# compiler
	//		// not to mark type as beforefieldinit
	//		static Nested()
	//		{
	//		}

	//		internal static readonly HeroesData instance = new HeroesData();
	//	}
	//}

	/// <summary>
	/// 
	/// </summary>
	/// <remarks>The 6th version of singleton is better in all threaded environments</remarks>
	public sealed class HeroesData
	{
		public ConcurrentDictionary<long, Hero> Dic { get; private set; }

		private static readonly Lazy<HeroesData> lazy =
			new Lazy<HeroesData>(() => new HeroesData());

		public static HeroesData Instance { get { return lazy.Value; } }

		private HeroesData()
		{
			Dic = new ConcurrentDictionary<long, Hero>(new KeyValuePair<long, Hero>[] {
				new KeyValuePair<long, Hero>(11, new Hero(11, "Mr. Nice")),
				new KeyValuePair<long, Hero>(12, new Hero(12, "Narco")),
				new KeyValuePair<long, Hero>(13, new Hero(13, "Bombasto")),
				new KeyValuePair<long, Hero>(14, new Hero(14, "Celeritas")),
				new KeyValuePair<long, Hero>(15, new Hero(15, "Magneta")),
				new KeyValuePair<long, Hero>(16, new Hero(16, "RubberMan")),
				new KeyValuePair<long, Hero>(17, new Hero(17, "Dynama")),
				new KeyValuePair<long, Hero>(18, new Hero(18, "Dr IQ")),
				new KeyValuePair<long, Hero>(19, new Hero(19, "Magma")),
				new KeyValuePair<long, Hero>(20, new Hero(29, "Tornado")),

				});
		}
	}
}
