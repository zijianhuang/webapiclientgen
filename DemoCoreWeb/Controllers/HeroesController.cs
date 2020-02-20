using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Serialization;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace DemoWebApi.Controllers
{
	/// <summary>
	/// Heroes operations
	/// </summary>
	[Route("api/[controller]")]
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
		/// Get a hero.
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet("{id}")]
		[ActionName("GetHero")]
		public Hero Get(long id)
		{
			Hero r;
			HeroesData.Instance.Dic.TryGetValue(id, out r);
			return r;
		}

		[HttpDelete("{id}")]
		public void Delete(long id)
		{
			Hero r;
			HeroesData.Instance.Dic.TryRemove(id, out r);
		}

		/// <summary>
		/// Add a hero
		/// </summary>
		/// <param name="name"></param>
		/// <returns></returns>
		[HttpPost("q")]
		public Hero PostWithQuery([FromQuery] string name)//.net core difference: requires explicit decorattion. Also the path can not be identical to any existing one.
		{
			var max = HeroesData.Instance.Dic.Keys.Max();
			var hero = new Hero { Id = max + 1, Name = name };
			HeroesData.Instance.Dic.TryAdd(max + 1, hero);
			return hero;
		}

		[HttpPost]
		public Hero Post([FromBody] string name)//.net core difference: requires explicit decorattion
		{
			var max = HeroesData.Instance.Dic.Keys.Max();
			var hero = new Hero { Id = max + 1, Name = name };
			HeroesData.Instance.Dic.TryAdd(max + 1, hero);
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
			return HeroesData.Instance.Dic.Values
				.Where(d => 
				d.Name.Contains(name)).ToArray();
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

		///// <summary>
		///// This should triger error: System.ArgumentException: Web API Heroes/GetSomethingInvalid is defined with invalid parameters: Not support ParameterBinder FromQuery or FromUri with a class parameter.
		///// </summary>
		///// <param name="h"></param>
		///// <returns></returns>
		//[HttpGet("invalid")]
		//public IActionResult GetSomethingInvalid(DemoWebApi.DemoData.Person h)//Person is considered as ModelMetadata.IsComplexType
		//{
		//    return new StatusCodeResult(200);
		//}

		///// <summary>
		///// This should triger error: System.ArgumentException: Web API Heroes/GetSomethingInvalid is defined with invalid parameters: Not support ParameterBinder FromQuery or FromUri with a class parameter.
		///// </summary>
		///// <param name="h"></param>
		///// <returns></returns>
		//[HttpGet("invalid")]
		//public IActionResult GetSomethingInvalid(Hero h) //But Hero is NOT considered as ModelMetadata.IsComplexType
		//{
		//    return new StatusCodeResult(200);
		//}

	}

	/// <summary>
	/// Complex hero type
	/// </summary>
	[DataContract(Namespace = DemoWebApi.DemoData.Constants.DataNamespace)]
	public class Hero
	{
		[DataMember]
		public long Id { get; set; }

		[DataMember]
		public string Name { get; set; }
	}


	public sealed class HeroesData
	{
		private static readonly Lazy<HeroesData> lazy =
			new Lazy<HeroesData>(() => new HeroesData());

		public static HeroesData Instance { get { return lazy.Value; } }

		private HeroesData()
		{
			Dic = new ConcurrentDictionary<long, Hero>(new KeyValuePair<long, Hero>[] {
				new KeyValuePair<long, Hero>(11, new Hero {Id=11, Name="Mr. Nice" }),
				new KeyValuePair<long, Hero>(12, new Hero {Id=12, Name="Narco" }),
				new KeyValuePair<long, Hero>(13, new Hero {Id=13, Name="Bombasto" }),
				new KeyValuePair<long, Hero>(14, new Hero {Id=14, Name="Celeritas" }),
				new KeyValuePair<long, Hero>(15, new Hero {Id=15, Name="Magneta" }),
				new KeyValuePair<long, Hero>(16, new Hero {Id=16, Name="RubberMan" }),
				new KeyValuePair<long, Hero>(17, new Hero {Id=17, Name="Dynama" }),
				new KeyValuePair<long, Hero>(18, new Hero {Id=18, Name="Dr IQ" }),
				new KeyValuePair<long, Hero>(19, new Hero {Id=19, Name="Magma" }),
				new KeyValuePair<long, Hero>(20, new Hero {Id=29, Name="Tornado" }),

				});
		}

		public ConcurrentDictionary<long, Hero> Dic { get; private set; }
	}
}
