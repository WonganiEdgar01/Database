const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const port = process.env.PORT || 3000;

// Set EJS as the view engine and set views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the directory if it doesn't exist
    const uploadPath = path.join(__dirname, 'public/images/uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create a unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'blog-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


let posts = [
  {
    id: 1,
    title: "Exploring wonders of Lake Malawi",
    image: "Lake-Malawi.jpg",
    content: `
      Lake Malawi, also known as Lake Nyasa in Tanzania and Lago Niassa in Mozambique, is an African 
      Great Lake located between Malawi, Mozambique, and Tanzania. It is the third largest lake in 
      Africa and the ninth largest in the world. The lake is approximately 580 km long and 75 km 
      wide at its widest point, with a total area of about 29,600 km². The lake is famous for 
      being home to more species of fish than any other lake in the world, including at least 700 
      species of cichlids, with many still waiting to be discovered and described.<br><br>

      For the people of Malawi, the lake is a vital resource providing food, water transport, 
      and tourism opportunities. The lake's clear waters and sandy beaches make it a popular 
      destination for swimming, snorkeling, sailing, and kayaking. In 1984, the lake was designated 
      a UNESCO World Heritage Site for its global importance in biodiversity conservation. The Lake 
      Malawi National Park, located at the southern end of the lake, protects various aquatic 
      habitats and hundreds of fish species found nowhere else on Earth. Local legend tells that the
      lake was discovered by the renowned Scottish explorer David Livingstone in 1859, though it 
      had been known to local people for centuries before European arrival. The Yao people called 
      it Nyasa, meaning simply "lake."
    `,
    createdAt: new Date('2024-07-15')
  },
  {
    id: 2,
    title: "Mulanje Mountain",
    image: "mount-mulanje.jpg",
    content: `
      Mulanje Massif, also known as Mount Mulanje, is a large inselberg in southern Malawi that 
      rises dramatically from the surrounding plains of Phalombe. At its highest point, Sapitwa Peak, 
      it reaches 3,002 meters (9,849 feet), making it the highest mountain in Central Africa. The 
      massif was formed about 130 million years ago from a granite upwelling. Over millennia, 
      erosion has sculpted the mountain into its current form with dramatic peaks, deep valleys, 
      and high plateaus. The mountain is known for its unique microclimate, with frequent cloud cover 
      and higher rainfall than the surrounding areas.<br><br>
      
      Mulanje is ecologically significant as it hosts numerous endemic species of plants and animals, 
      including the Mulanje cedar (Widdringtonia whytei), Malawi's national tree. This slow-growing conifer 
      is critically endangered due to illegal logging and fires. The mountain holds cultural significance for the
      local people, featuring prominently in local folklore. One legend tells of a powerful spirit,
      Napolo, who resides on the mountain and causes thunderstorms and landslides when displeased.
      Today, Mulanje is a popular destination for hiking and climbing, with several huts maintained
      by the Malawi Mountain Club providing accommodation for multiday treks. The challenging ascent
      to Sapitwa Peak offers breathtaking views of the surrounding landscape.
    `,
    createdAt: new Date('2024-07-10')
  },
  { 
    id: 3,
    title: "Nyika Plateau",
    image: "nyika-plateau.jpg",
    content: `
      Nyika Plateau is a beautiful, high-altitude plateau located in northern Malawi, with a small
      extension in northeastern Zambia. Most of the plateau lies within Nyika National Park, 
      Malawi's largest national park, covering an area of about 3,200 km². The name "Nyika" means
      "where the water comes from" in the local language, an appropriate name as the plateau is the
      source of several important rivers. The landscape is characterized by rolling grasslands 
      interspersed with patches of forest, dramatic escarpments, and occasional granite outcrops.
      At elevations between 1,800 and 2,500 meters, Nyika has a cool climate unusual for Africa,with
      temperatures sometimes dropping below freezing in winter.<br><br>
      
      This unique environment supports flora and fauna not found elsewhere in Malawi, including orchids, 
      proteas, and over 400 species of birds. Large mammals found on the plateau include eland, roan antelope,
      zebra, leopard, and elephant. The park is particularly known for its high density of leopards, though these
      elusive cats are rarely seen by visitors. The plateau has a rich cultural history, with 
      evidence of human occupation dating back to the Stone Age. During the colonial era, the area
      was set aside as a forest reserve before being declared a national park in 1965.Today, 
      visitors to Nyika can enjoy game drives, hiking, mountain biking, and horse riding safaris. 
      The park's remote location and unique high-altitude ecosystem offer a wilderness experience 
      unlike any other in Africa.
    `,
    createdAt: new Date('2025-Aug-20')
  },
  {
    id: 4,
    title: "Liwonde National Park",
    image: "liwonde-park.jpg",
    content: `
      Liwonde National Park, located in southern Malawi along the upper Shire River, is one of the 
      country's premier wildlife destinations. Established in 1973, the park covers 548 square 
      kilometers of diverse habitats including floodplains, woodlands, and lagoons. The park is 
      best known for its large populations of elephants and hippos, which can often be seen along 
      the riverbanks. Other wildlife includes crocodiles, antelope species such as kudu and 
      waterbuck, and over 400 species of birds. In recent years, Liwonde has been the focus of 
      major conservation efforts. In 2015, African Parks assumed management of the reserve and 
      initiated an ambitious program to restore wildlife populations. This included the 
      reintroduction of cheetahs in 2017 and lions in 2018, making Liwonde the only park in Malawi 
      where visitors can see all of Africa's "Big Five" (except rhino).<br><br>
      
      The Shire River, which flows along the western boundary of the park, is its lifeblood. 
      Boat safaris along the river offer excellent opportunities to view wildlife, particularly hippos 
      and crocodiles. The river is also home to rare and endangered species such as the African skimmer 
      and Nile monitor lizard. Local communities have lived around the park for generations, and 
      conservation efforts now include community outreach programs to ensure that local people 
      benefit from tourism and conservation. These initiatives have helped reduce human-wildlife 
      conflict and poaching. Today, visitors to Liwonde can enjoy game drives, boat safaris, and 
      walking safaris, with accommodation options ranging from luxury lodges to basic campsites. 
      The park's accessibility from Blantyre and its diverse wildlife make it one of Malawi's most 
      popular tourist destinations.
    `,
    createdAt: new Date('2022-11-15')
  },
  {
    id: 5,
    title: "Zomba Plateau",
    image: "zomba-mount.jpg",
    content: `
      Zomba Plateau is a striking granite massif that rises dramatically to about 1,800 meters 
      (6,000 feet) above the city of Zomba, the former colonial capital of Malawi. The plateau 
      covers an area of approximately 130 square kilometers and offers some of the most 
      breathtaking views in the country. The plateau was formed about 130 million years ago 
      during the breakup of Gondwana, the ancient supercontinent. Over millennia, erosion has 
      sculpted the granite into its current form, with dramatic cliffs, rocky outcrops, and deep 
      valleys. Zomba's elevation creates a cool, moist climate that supports diverse vegetation, 
      including evergreen forests, pine plantations, grasslands, and patches of heather. 
      The plateau is home to various antelope species, monkeys, and over 100 species of birds. 
      The plateau has several streams and rivers that originate from its heights, including the 
      Mulunguzi, Domasi, and Likangala rivers. These water sources feed the surrounding agricultural
      lands and provide drinking water for the city below.<br>

      During the colonial era, Zomba was developed as a hill station where British officials 
      could escape the heat of the lowlands. Remnants of this era include the former Governor's 
      residence and various walking trails. The plateau also served as an important site for 
      astronomical observations in the early 20th century.Today, Zomba Plateau is a popular 
      destination for hiking, mountain biking, and horseback riding. Key attractions include 
      Emperor's View, which offers panoramic vistas of Lake Chilwa and the Shire Highlands, and 
      the Chagwa Falls. The plateau's cool climate and scenic beauty make it a refreshing retreat 
      from Malawi's lowland heat.
    `,
    createdAt: new Date('2023-05-20')
  },
  {
    id: 6,
    title: "Cape Maclear",
    image: "cape-maclear.jpg",
    content: `  
      Cape Maclear, known locally as Chembe, is a picturesque fishing village located on the 
      southern shore of Lake Malawi within the Lake Malawi National Park. This UNESCO World 
      Heritage Site is renowned for its stunning beaches, crystal-clear waters, and incredible 
      biodiversity.The cape was named after Sir Thomas Maclear, Astronomer Royal at the Cape of 
      Good Hope and friend of David Livingstone, who visited the area in 1859. Livingstone's 
      mission established a base here, making it one of the first places in Malawi visited by 
      Europeans.

      The waters around Cape Maclear are home to hundreds of species of colorful cichlid fish, 
      making it a snorkeling and diving paradise. The aquarium-like clarity of the water allows 
      visitors to observe these unique fish in their natural habitat without even getting wet.
      Beyond its natural beauty, Cape Maclear has a rich cultural history. The area has been 
      inhabited by the Chewa people for centuries, and traditional fishing methods are still 
      practiced today. The village offers visitors a glimpse into authentic Malawian life alongside 
      tourist facilities.

      earby islands, including Thumbi West Island and Domwe Island, provide excellent opportunities
      for kayaking, hiking, and camping. The area is also known for its spectacular sunsets, which 
      paint the sky and lake in brilliant shades of orange and red. Conservation efforts in the 
      area focus on protecting the lake's unique biodiversity while supporting sustainable tourism 
      that benefits local communities. These initiatives have helped maintain Cape Maclear's status 
      as one of Malawi's premier tourist destinations.
    `,
    createdAt: new Date('2023-08-10')
  }
];
let nextId = posts.length + 1;

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    posts: posts.sort((a, b) => b.createdAt - a.createdAt),
    title: 'Malawi Tourism Blog - Discover the Beauty of Malawi'
  });
});

// Redirect 
app.get('/create', (req, res) => {
  res.redirect('/posts/new');
});

// About page
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us - Malawi Tourism Blog'
  });
});

// Create new post form
app.get('/posts/new', (req, res) => {
  res.render('create', {
    title: '',
    post: {}
  });
});

// View single post
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).render('error', { 
      message: 'Post not found',
      title: 'Post Not Found - Malawi Tourism Blog'
    });
  }
  res.render('post', {
    title: `${post.title} - Malawi Tourism Blog`,
    post
  });
});

// Create new post (handle form submission)
app.post('/posts', upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  let image = 'default.jpg'; // Default image

  // If a file was uploaded, use its filename
  if (req.file) {
    image = 'uploads/' + req.file.filename;
  }

  // Validation
  if (!title || !content) {
    return res.status(400).render('create', {
      title: '',
      error: 'Title and content are required',
      post: { title, content }
    });
  }
  
  const newPost = {
    id: nextId++,
    title,
    image: image,
    content,
    createdAt: new Date()
  };
  posts.push(newPost);
  res.redirect(`/posts/${newPost.id}`);
});

// Edit post form
app.get('/posts/:id/edit', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
    res.render('edit', {
    title: `Edit ${post.title} - Malawi Tourism Blog`,
    post
  });
  
  if (!post) {
    return res.status(404).render('error', { 
      message: 'Post not found',
      title: 'Post Not Found - Malawi Tourism Blog'
    });
  }
});

// Update post (handle edit form submission)
app.put('/posts/:id', upload.single('image'), (req, res) => {
  const { title, content, removeImage } = req.body;
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  
  if (postIndex === -1) {
    return res.status(404).render('error', { 
      message: 'Post not found',
      title: 'Post Not Found - Malawi Tourism Blog'
    });
  }
  
  // Validation
  if (!title || !content) {
    return res.status(400).render('edit', {
      title: 'Edit blog post - Malawi Tourism Blog',
      error: 'Title and content are required',
      post: { id: req.params.id, title, content }
    });
  }

  let image = posts[postIndex].image;
  
  // Handle image removal
  if (removeImage === 'true') {
    image = 'default.jpg';
  }
  
  // If a new file was uploaded, use its filename
  if (req.file) {
    image = 'uploads/' + req.file.filename;
  }

  posts[postIndex] = {
    ...posts[postIndex],
    title,
    image,
    content
  };
  res.redirect(`/posts/${req.params.id}`);
});

// Delete post
app.delete('/posts/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  
  if (postIndex === -1) {
    return res.status(404).render('error', { 
      message: 'Post not found',
      title: 'Post Not Found - Malawi Tourism Blog'
    });
  }

  posts.splice(postIndex, 1);
  res.redirect('/');
});

// Contact page
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us - Malawi Tourism Blog'
  });
});

// Process contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).render('contact', {
      title: 'Contact Us - Malawi Tourism Blog',
      error: 'All fields are required',
      formData: { name, email, message }
    });
  }

  // Show success message
  res.render('contact', {
    title: 'Contact Us - Malawi Tourism Blog',
    success: 'Thank you for your message! We will get back to you soon.'
  });
});

// Error handling for file uploads
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).render('create', {
        title: 'Create a new blog post - Malawi Tourism Blog',
        error: 'File size exceeds the 5MB limit.',
        post: { title: req.body.title, content: req.body.content }
      });
    }
  } else if (error) {
    return res.status(400).render('create', {
      title: 'Create a new blog post - Malawi Tourism Blog',
      error: error.message,
      post: { title: req.body.title, content: req.body.content }
    });
  }
  next();
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Page not found. The requested URL was not found on this server.',
    title: 'Page Not Found - Malawi Tourism Blog'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});