using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
namespace Fonlow.PoemsApp.Data
{
	/// <summary>
	/// Highest level container for every poems written by a poet, for exporting to other formats
	/// </summary>
	[DataContract]
	public class PoemCollection
	{
		public PoemCollection()
		{
			Poems = Array.Empty<Poem>();
			Albums = Array.Empty<Album>();
			Tags = Array.Empty<Tag>();
		}

		[DataMember(IsRequired =true)]
		public Poem[] Poems { get; set; }

		[DataMember(IsRequired = true)]
		public Album[] Albums { get; set; }

		[DataMember(IsRequired = true)]
		public Tag[] Tags { get; set; }

		[DataMember(IsRequired = true)]
		public Annotation[] Annotations { get; set; }

		[DataMember(IsRequired = true)]
		public NumberedAnnotation[] NumberedAnnotations { get; set; }

		[DataMember(IsRequired = true)]
		public PoemTagMap[] TagMaps { get; set; }

		[DataMember(IsRequired = true)]
		public PoemAlbumMap[] AlbumMaps { get; set; }

		[DataMember(IsRequired = true)]
		public PoemAnnotationMap[] AnnotationMaps { get; set; }

		[DataMember(IsRequired = true)]
		public MetaData[] KeyValues { get; set; }

		[DataMember]
		public PoemPictureMap[] PictureMaps { get; set; }

		[DataMember]
		public PictureMeta[] PictureMetas { get; set; }

	}

	[DataContract]
	public enum BodyType
	{
		[EnumMember]
		Text = 0,
		[EnumMember]
		HTML = 1,
		[EnumMember]
		MD = 2
	};

	[DataContract]
	public class Poem
	{
		public Poem()
		{
			AlbumMap = new List<PoemAlbumMap>();
			TagMap = new List<PoemTagMap>();
			AnnotationMap = new List<PoemAnnotationMap>();
			NumberedAnnotations = new List<NumberedAnnotation>();
			PictureMap = new List<PoemPictureMap>();
		}

		public Poem(Guid id) : this()
		{
			Id = id;
		}

		[DataMember]
		public Guid Id { get; private set; }

		[DataMember]
		public string Title { get; set; }

		[DataMember]
		public string Body { get; set; }

		/// <summary>
		/// When bodytype is HTML, a redundant copy for full text search. A poor man solution.
		/// </summary>
		[DataMember]
		public string BodyPlain { get; set; }

		[DataMember]
		public BodyType BodyType { get; set; }

		/// <summary>
		/// Author should be able to alter. The default is the created time.
		/// </summary>
		[DataMember]
		public DateTime? Created { get; set; }

		[DataMember]
		public DateTime? Modified { get; set; }

		/// <summary>
		/// to distinguish draft or published. DateTime.
		/// </summary>
		[DataMember]
		public DateOnly? Published { get; set; }

		/// <summary>
		/// Initial published URL.
		/// </summary>
		[DataMember]
		public string PublishedUrl { get; set; }

		/// <summary>
		/// A poem may be included in multipe albums.
		/// UI may use this to present albums
		/// </summary>
		[DataMember]
		public Guid[] AlbumIds => AlbumMap.Select(d => d.AlbumId).ToArray();

		/// <summary>
		/// UI use this to represent tags. This is not included n DB.
		/// </summary>
		[DataMember]
		public Guid[] TagIds => TagMap.Select(d => d.TagId).ToArray();

		[DataMember]
		public Guid[] AnnotationIds => AnnotationMap.Select(d => d.AnnotationId).ToArray();

		[DataMember]
		public NumberedAnnotationBrief[] NumberedAnnotationBriefs => NumberedAnnotations.Select(d => new NumberedAnnotationBrief { Id = d.Id, OrderNumber = d.OrderNumber }).ToArray();

		[DataMember]
		public Guid[] PictureIds => PictureMap.Select(d => d.PictureId).ToArray();

		[DataMember]
		public string RyhmesCsv { get; set; }

		[DataMember]
		public int NumberOfStanza { get; set; } = 1; //https://www.juicyenglish.com/blog/parts-of-a-poem

		/// <summary>
		/// When deleting, mapping is removed by EF, while album remains.
		/// </summary>
		public virtual List<PoemAlbumMap> AlbumMap { get; private set; }
		/// <summary>
		/// When deleting, mapping is removed by EF, while tags remain.
		/// </summary>
		public virtual List<PoemTagMap> TagMap { get; private set; }

		/// <summary>
		/// When deleting, mapping is removied by EF, while annotatins remain.
		/// </summary>
		public virtual List<PoemAnnotationMap> AnnotationMap { get; private set; }

		/// <summary>
		/// When deleting, mapping is removied by EF, while pictures remain.
		/// </summary>
		public virtual List<PoemPictureMap> PictureMap { get; private set; }

		/// <summary>
		/// When the poem is deleted, these are removed by EF too.
		/// </summary>
		public virtual List<NumberedAnnotation> NumberedAnnotations { get; private set; }
	}

	[DataContract]
	public class Tag
	{
		[DataMember]
		public Guid Id { get; set; }

		[DataMember]
		public string Name { get; set; }
	}

	[DataContract]
	public class PictureMeta
	{
		[DataMember]
		public Guid Id { get; set; }

		[DataMember()]
		[MaxLength(128)]
		public string Name { get; set; }

		[DataMember]
		[MaxLength(512)]
		public string Description { get; set; }

		[DataMember]
		public string ContentType { get; set; }
	}

	[DataContract]
	public class Picture : PictureMeta
	{
		[DataMember]
		public byte[] Content { get; set; }
	}

	[DataContract]
	public class Album
	{
		[DataMember]
		public Guid Id { get; set; }
		/// <summary>
		/// Album title should never be changed.
		/// </summary>
		[DataMember]
		public string Title { get; set; }

		[DataMember]
		public string Description { get; set; }

		[DataMember]
		public BodyType BodyType { get; set; }

		/// <summary>
		/// First published Url
		/// </summary>
		[DataMember]
		public string PublishedUrl { get; set; }

		/// <summary>
		/// Author should be able to alter. The default is the created time. DateTime.
		/// </summary>
		[DataMember]
		public DateOnly? Published { get; set; }
	}

	[DataContract]
	public class PoemAlbumMap
	{
		public PoemAlbumMap(Guid poemId, Guid albumId)
		{
			PoemId = poemId;
			AlbumId = albumId;
		}

		[DataMember]
		public Guid PoemId { get; private set; }

		[DataMember]
		public Guid AlbumId { get; private set; }
	}

	[DataContract]
	public class PoemTagMap
	{
		public PoemTagMap(Guid poemId, Guid tagId)
		{
			PoemId = poemId;
			TagId = tagId;
		}

		[DataMember]
		public Guid PoemId { get; private set; }

		[DataMember]
		public Guid TagId { get; private set; }
	}

	[DataContract]
	public class PoemPictureMap
	{
		public PoemPictureMap(Guid poemId, Guid pictureId)
		{
			PoemId = poemId;
			PictureId = pictureId;
		}

		[DataMember]
		public Guid PoemId { get; private set; }

		[DataMember]
		public Guid PictureId { get; private set; }
	}

	[DataContract]
	public class PoemAnnotationMap
	{
		public PoemAnnotationMap(Guid poemId, Guid annotationId)
		{
			PoemId = poemId;
			AnnotationId = annotationId;
		}

		[DataMember]
		public Guid PoemId { get; private set; }

		[DataMember]
		public Guid AnnotationId { get; private set; }
	}

	[DataContract]
	public class PoemBrief
	{
		[DataMember(IsRequired = true)]
		public Guid Id { get; set; }

		[DataMember(IsRequired = true)]
		public string Title { get; set; }

		[DataMember(IsRequired = true)]
		public DateTime Date { get; set; }

		[DataMember]
		public DateOnly? Published { get; set; }

		[DataMember]
		public Guid[] TagIds { get; set; }

		public override bool Equals(object obj)
		{
			var p = obj as PoemBrief;
			return Id == p?.Id;
		}

		public override int GetHashCode()
		{
			return Id.GetHashCode();
		}

	}

	[DataContract]
	public class Annotation
	{
		[DataMember]
		public Guid Id { get; set; }
		/// <summary>
		/// 
		/// </summary>
		[DataMember]
		public string Name { get; set; }

		/// <summary>
		/// HTML description
		/// </summary>
		[DataMember]
		public string Description { get; set; }

		/// <summary>
		/// Primary URL for online description like an entry in Wikipedia
		/// </summary>
		[DataMember]
		public string Url { get; set; }
	}

	[DataContract]
	public class AnnotationBrief
	{
		[DataMember(IsRequired = true)]
		public Guid Id { get; set; }

		[DataMember(IsRequired = true)]
		public string Name { get; set; }

		/// <summary>
		/// Count of poems associated
		/// </summary>
		[DataMember]
		public int? Count { get; set; }
	}

	[DataContract]
	public class MetaDataPoemCount
	{
		[DataMember(IsRequired = true)]
		public Guid Id { get; set; }

		/// <summary>
		/// Count of poems associated
		/// </summary>
		[DataMember]
		public int Count { get; set; }
	}

	[DataContract]
	public class AnnotationPoemCount : MetaDataPoemCount
	{
	}

	[DataContract]
	public class TagPoemCount : MetaDataPoemCount
	{
	}

	[DataContract]
	public class PicturePoemCount : MetaDataPoemCount
	{
		[DataMember]
		public Guid[] PoemIds { get; set; }
	}

	/// <summary>
	/// Associated with a specific poem only.
	/// In case when a phase may be up to different interpretations, then used numbered annotation.
	/// </summary>
	[DataContract]
	public class NumberedAnnotation
	{

		/// <summary>
		/// Just for delete in EF
		/// </summary>
		public NumberedAnnotation()
		{

		}

		public NumberedAnnotation(Guid poemId, int orderNumber)
		{
			PoemId = poemId;
			OrderNumber = orderNumber;
		}

		[DataMember]
		public Guid Id { get; set; }

		/// <summary>
		/// 
		/// </summary>
		[DataMember(IsRequired = true)]
		public Guid PoemId { get; set; }

		[DataMember(IsRequired = true)]
		[Range(1, int.MaxValue)]
		public int OrderNumber { get; set; }

		/// <summary>
		/// HTML description
		/// </summary>
		[DataMember]
		public string Description { get; set; }

		/// <summary>
		/// Primary URL for online description like an entry in Wikipedia
		/// </summary>
		[DataMember]
		public string Url { get; set; }
	}

	[DataContract]
	public class NumberedAnnotationBrief
	{
		[DataMember(IsRequired = true)]
		public Guid Id { get; set; }

		[DataMember(IsRequired = true)]
		public int OrderNumber { get; set; }
	}

	[DataContract]
	public class MetaData
	{
		public MetaData(string key, string value)
		{
			Key = key;
			Value = value;
		}

		[DataMember]
		public string Key { get; set; }

		[DataMember]
		public string Value { get; set; }
	}

	/// <summary>
	/// For wrting or speaking.
	/// https://www.loc.gov/standards/iso639-2/php/code_list.php
	/// https://www.rfc-editor.org/rfc/rfc5646
	/// https://iso639-3.sil.org/code_tables/639/read
	/// https://iso639-3.sil.org/code_tables/download_tables
	/// </summary>
	[DataContract]
	public class LanguageCode
	{
		/// <summary>
		/// iso639 code. Could be 639-3, 639-2 or 639-1
		/// </summary>
		[DataMember]
		public string Code { get; set; }
		[DataMember]
		public string Display { get; set; }
	}

	[DataContract]
	public class ExternalImageMap
	{
		[DataMember]
		public string SrcUrl { get; set; }

		[DataMember]
		public string Name { get; set; }

		[DataMember]
		public string Description { get; set; }

		[DataMember]
		public Guid[] PoemIds { get; set; }
	}
}