<script lang="ts">
  export let linkType: string;
  export let link: any;

  let badgeColors = [
    {type: "scriptures", name:"Scriptures", style: "bg-primary-300 text-primary-900"},
    {type: "prophets_and_apostles", name:"Prophets & Apostles", style: "bg-secondary-300 text-secondary-900"},
    {type: "social_science", name:"Social Science", style: "bg-tertiary-300 text-tertiary-900"},
    {type: "article", name:"Article", style: "bg-success-300 text-success-900"},
    {type: "research_paper", name:"Research Paper", style: "bg-surface-300 text-surface-900"}
  ]

  let volumeConversion = [
    {
      volume: "Old Testament",
      abbreviation: "ot",
      books: [
        { name: "Genesis", abbreviation: "gen"},
        { name: "Exodus", abbreviation: "ex"},
        { name: "Leviticus", abbreviation: "lev"},
        { name: "Deuteronomy", abbreviation: "deut"},
        { name: "Joshua", abbreviation: "josh"},
        { name: "Judges", abbreviation: "judg"},
        { name: "Ruth", abbreviation: "ruth"},
        { name: "1 Samuel", abbreviation: "1-sam"},
        { name: "2 Samuel", abbreviation: "2-sam"},
        { name: "1 Kings", abbreviation: "1-kgs"},
        { name: "2 Kings", abbreviation: "2-kgs"},
        { name: "1 Chronicles", abbreviation: "1-chr"},
        { name: "2 Chronicles", abbreviation: "2-chr"},
        { name: "Ezra", abbreviation: "ezra"},
        { name: "Nehemiah", abbreviation: "neh"},
        { name: "Esther", abbreviation: "esth"},
        { name: "Job", abbreviation: "job"},
        { name: "Psalms", abbreviation: "ps"},
        { name: "Proverbs", abbreviation: "prov"},
        { name: "Ecclesiastes", abbreviation: "eccl"},
        { name: "Song of Solomon", abbreviation: "song"},
        { name: "Isaiah", abbreviation: "isa"},
        { name: "Jeremiah", abbreviation: "jer"},
        { name: "Lamentations", abbreviation: "lam"},
        { name: "Ezekiel", abbreviation: "ezek"},
        { name: "Daniel", abbreviation: "dan"},
        { name: "Hosea", abbreviation: "hosea"},
        { name: "Joel", abbreviation: "joel"},
        { name: "Amos", abbreviation: "amos"},
        { name: "Obadiah", abbreviation: "obad"},
        { name: "Jonah", abbreviation: "jonah"},
        { name: "Micah", abbreviation: "micah"},
        { name: "Nahum", abbreviation: "nahum"},
        { name: "Habakkuk", abbreviation: "hab"},
        { name: "Zephaniah", abbreviation: "zeph"},
        { name: "Haggai", abbreviation: "hag"},
        { name: "Zechariah", abbreviation: "zech"},
        { name: "Malachi", abbreviation: "mal"}
      ]
    },
    {
      volume: "New Testament",
      abbreviation: "nt",
      books: [
        { name: "Matthew", abbreviation: "matt"},
        { name: "Mark", abbreviation: "mark"},
        { name: "Luke", abbreviation: "luke"},
        { name: "John", abbreviation: "john"},
        { name: "Acts", abbreviation: "acts"},
        { name: "Romans", abbreviation: "rom"},
        { name: "1 Corinthians", abbreviation: "1-cor"},
        { name: "2 Corinthians", abbreviation: "2-cor"},
        { name: "Galatians", abbreviation: "gal"},
        { name: "Ephesians", abbreviation: "eph"},
        { name: "Philippians", abbreviation: "philip"},
        { name: "Colossians", abbreviation: "col"},
        { name: "1 Thessalonians", abbreviation: "1-thes"},
        { name: "2 Thessalonians", abbreviation: "2-thes"},
        { name: "1 Timothy", abbreviation: "1-tim"},
        { name: "2 Timothy", abbreviation: "2-tim"},
        { name: "Titus", abbreviation: "titus"},
        { name: "Philemon", abbreviation: "philem"},
        { name: "Hebrews", abbreviation: "heb"},
        { name: "James", abbreviation: "james"},
        { name: "1 Peter", abbreviation: "1-pet"},
        { name: "2 Peter", abbreviation: "2-pet"},
        { name: "1 John", abbreviation: "1-jn"},
        { name: "2 John", abbreviation: "2-jn"},
        { name: "3 John", abbreviation: "3-jn"},
        { name: "Jude", abbreviation: "jude"},
        { name: "Revelation", abbreviation: "rev"}
      ]
    },
    {
      volume: "Book of Mormon",
      abbreviation: "bofm",
      books: [
        { name: "1 Nephi", abbreviation: "1-ne"},
        { name: "2 Nephi", abbreviation: "2-ne"},
        { name: "Jacob", abbreviation: "jacob"},
        { name: "Enos", abbreviation: "enos"},
        { name: "Jarom", abbreviation: "jarom"},
        { name: "Omni", abbreviation: "omni"},
        { name: "Words of Mormon", abbreviation: "w-of-m"},
        { name: "Mosiah", abbreviation: "mosiah"},
        { name: "Alma", abbreviation: "alma"},
        { name: "Helaman", abbreviation: "hel"},
        { name: "3 Nephi", abbreviation: "3-ne"},
        { name: "4 Nephi", abbreviation: "4-ne"},
        { name: "Mormon", abbreviation: "morm"},
        { name: "Ether", abbreviation: "ether"},
        { name: "Moroni", abbreviation: "moro"},
      ]
    },
    {
      volume: "Doctrine & Covenants",
      abbreviation: "dc-testament"
    },
    {
      volume: "Pearl of Great Price",
      abbreviation: "pgp",
      books: [
        { name: "Moses", abbreviation: "moses"},
        { name: "Abraham", abbreviation: "abr"},
        { name: "Joseph Smith-Matthew", abbreviation: "js-m"},
        { name: "Joseph Smith-History", abbreviation: "js-h"},
        { name: "Articles of Faith", abbreviation: "a-of-f"}
      ]
    }
  ]

  let reference: any;
  
  // Assign reference
  if(linkType === "scripture") {
    
    
    if(link.volume === "Doctrine & Covenants") {
      reference = {
        title: `D&C ${link.chapter}:${link.verses}`,
        url: `https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/${link.chapter}?lang=eng&id=${link.verses}#p${link.verses.includes('-') ? link.verses.slice(0, link.verses.indexOf('-')) : link.verses}`
      };
    } else {
      let findVolume = volumeConversion.find(o => o.volume === link.volume);
      
      if(typeof findVolume !== 'undefined') {
        let findBook = findVolume.books.find(o => o.name.toLowerCase() === link.book.toLowerCase());
        
        reference = {
          title: `${findBook?.name} ${link.chapter}:${link.verses}`,
          url: `https://www.churchofjesuschrist.org/study/scriptures/${findVolume.abbreviation}/${findBook?.abbreviation}/${link.chapter}?lang=eng&id=${link.verses}#p${link.verses.includes('-') ? link.verses.slice(0, link.verses.indexOf('-')) : link.verses}`
        };
      } else {
        reference = {
          title: "ERROR PROCESSING REFERENCE",
          url: "/"
        }
      }
      
    }
    
    reference.badge =badgeColors[0]; 
  } else {
    let findBadge = badgeColors.find(o => o.type === link.type);
    
    reference = {
      badge: findBadge,
      title: link.title,
      url: link.url
    };
  }
</script>

<!-- COMPONENT START -->
<li class="py-0.5">
  <!-- LINK START -->
  <a href={reference.url} target="_blank">
  
    <!-- Link Badge -->
    <span class={`badge ${reference.badge.style}`}>{reference.badge.name}</span>
    
    <!-- Link Title -->
    <span class="flex-auto">{reference.title}</span>
    
    <!-- LINK ICON START -->
    <span class="">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    </span>
    <!-- LINK ICON END -->
  </a>
  <!-- LINK END -->
</li>
<!-- COMPONENT END -->