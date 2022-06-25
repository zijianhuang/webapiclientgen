using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Serialization;
using System.Collections.Concurrent;
using System.Threading.Tasks;

#nullable enable
namespace DemoWebApi.Controllers
{
	/// <summary>
	/// Heroes operations. Decorated by nullable directive.
	/// </summary>
	//[ApiController] for opt-in without ApiExplorerVisibilityEnabledConvention
	[Route("api/[controller]")]
	[ApiExplorerSettings(IgnoreApi = false)]
	public class HeroesController : ControllerBase
	{
		/// <summary>
		/// Get all heroes.
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[ActionName("GetHeros")]
		public Hero[] Get()
		{
			return HeroesData.Instance.Dic.Values.ToArray();
		}

		/// <summary>
		/// Get a hero. Nullable reference.
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet("{id}")]
		[ActionName("GetHero")]
		public Hero? Get(long id)
		{
			_ = HeroesData.Instance.Dic.TryGetValue(id, out Hero? r);
			return r;
		}

		[HttpGet("super")]
		[ActionName("GetSuperHero")]
		public SuperHero? GetSuper([FromQuery] long id)
		{
			_ = HeroesData.Instance.Dic.TryGetValue(id, out Hero? r);
			return r as SuperHero;
		}

		[HttpDelete("{id}")]
		public void Delete(long id)
		{
			_ = HeroesData.Instance.Dic.TryRemove(id, out _);
		}

		/// <summary>
		/// Add a hero. The client will not expect null.
		/// </summary>
		/// <param name="name"></param>
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
		Hero CreateHero(string name)
		{
			var max = HeroesData.Instance.Dic.Keys.Max();
			var hero = new Hero(max + 1, name);
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
			var values = HeroesData.Instance.Dic.Values;
			return values.Where(d => d.Name.Contains(name)).ToArray();
		}

		[HttpGet("asyncHeroes")]
		public async IAsyncEnumerable<Hero> GetAsyncHeroes()
		{
			foreach (var item in HeroesData.Instance.Dic.Values)
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
		}

		[DataMember]
		public long Id { get; set; }

		[DataMember]
		public string Name { get; set; }
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

	public sealed class HeroesData
	{
		public ConcurrentDictionary<long, Hero> Dic { get; private set; }

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

		public static HeroesData Instance { get { return Nested.instance; } }

		private class Nested
		{
			// Explicit static constructor to tell C# compiler
			// not to mark type as beforefieldinit
			static Nested()
			{
			}

			internal static readonly HeroesData instance = new HeroesData();
		}
	}
}
#nullable disable