LEARN SECTION IMAGES
====================

Drop images in this folder. Nothing else to edit - the filename IS the
mapping. src/lib/learn/images.ts reads this directory at build time, so a
correctly named file appears on the page and a missing one falls back to the
drawn gradient. No image is ever broken, and no list has to be kept in sync.

NOT in public/images/gallery/ on purpose: src/data/gallery.ts auto-publishes
every folder under there to the public gallery page, which would scatter
these among the project photos.

FILENAMES
---------
  hero.jpg                     The /learn landing hero, right-hand side
  card-podcast.jpg             Category card 01 on the landing page
  card-articles.jpg            Category card 02
  card-guides.jpg              Category card 03
  card-legislation.jpg         Category card 04
  card-trends.jpg              Category card 05
  card-3d-models.jpg           Category card 06
  banner-podcast.jpg           Header of /learn/podcast
  banner-articles.jpg          Header of /learn/articles   (same for each)
  article-<slug>.jpg           One per article, slug must match the URL
                               e.g. article-jenga-kwako-who-qualifies.jpg

Extension can be .jpg .jpeg .png .webp or .avif - the lookup ignores it.
Case is ignored too. Anything not named above is simply unused.

SIZES - please stick to these
-----------------------------
  Cards and banners   1600 x 900   (16:9, same rhythm as the video posters)
  Hero                2400 x 1350  (16:9)
  Article headers     1600 x 900

  Under 250KB each. JPEG at quality 75, or WebP.

This matters: the site already carries ~39MB of product images, one of them
14.9MB, and that is the single biggest performance problem it has. Please do
not add to it. Squoosh (squoosh.app) does this in the browser in seconds.

WHAT MAKES A GOOD ONE HERE
--------------------------
Real sites, real drawings, real people working. Not stock photography of
men in hard hats pointing at clipboards - the whole premise of this section
is that it is written by people who actually do the work, and stock imagery
contradicts that in the first half second.
