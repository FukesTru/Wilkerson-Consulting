# Wilkerson Consulting: website images

Illustrative photographs, generated with Higgsfield GPT Image 2.6 (quality high, resolution 2K, aspect ratio 16:9). They are still lifes and street scenes. They are not photos of Ray Wilkerson, staff, clients, or the firm's actual office, and the site never presents them that way. No portrait of Ray was generated. Every alt text starts with "Illustrative photo:".

**Rule: each photo is used on one page only** (in a hero, a section, a card or a background), and never twice on the same page. Logos, favicons, the touch icon and the social sharing image are exempt. Check it with `node tools/image-dupes.mjs public`, which must print `OK: every photo is used on one page only`.

Each prompt asked for a candid documentary look in a Reno or northern Nevada setting, with no people, faces or hands, no screens showing anything, no charts, no readable text, numbers, logos or signs, no snow, and nothing glossy or CGI. Every result was checked at full size before use. Regenerated: the home hero (the first version had palm trees) and the FAQ notebook (the first version had fake handwriting that could almost be read).

Web files: each `<name>.jpg` is 1920 x 1086 and under 400 KB, with `<name>-1200.jpg` and `<name>-800.jpg` copies that the pages load through `srcset`. The 2688 x 1520 PNG originals are kept by the operator, not in this repo.

| File | Only page | What it shows |
| --- | --- | --- |
| `hero-office-desk.jpg` | `/` (home hero) | A walnut desk by a large window: a closed laptop, a loose stack of plain manila folders, a coffee cup on a saucer, a plant and a leather chair. Outside, an ordinary high-desert city with dry tan foothills. |
| `construction-accounting.jpg` | `/services/construction-accounting/` (hero) | A worn job-trailer desk: a scuffed hard hat, a plain blueprint roll, an architect's scale, a blank calculator, folders, a closed laptop and a mug. Outside, a steel frame on a desert site. |
| `manufacturing-cost-accounting.jpg` | `/services/manufacturing-cost-accounting/` (hero) | A shop-office desk with plain machined parts in steel trays, a notebook, a calculator and a switched-off monitor, looking into an empty, slightly worn machine shop. |
| `attorney-trust-accounting.jpg` | `/services/attorney-trust-accounting/` (hero) | 3 cloth-bound books with blank spines, a wooden tray of plain folders, a river-stone paperweight and a fountain pen on a worn leather blotter, with sagebrush outside. |
| `forensic-accounting.jpg` | `/services/forensic-accounting/` (hero) | 2 stacks of printed spreadsheet pages with highlighted rows, all data unreadable, a highlighter and a pencil on a worn desk. No hands. |
| `services-overview.jpg` | `/services/` (hero) | An office shelf of plain navy and grey binders with blank spines and magazine files, a trailing pothos, and a window onto dry Nevada hills. |
| `about-practice.jpg` | `/about/` (hero) | A closed navy folder, tortoiseshell reading glasses and a fountain pen on a walnut desk beside a plant, with sagebrush hills outside. |
| `what-to-expect.jpg` | `/what-to-expect/` (hero) | A wooden table set for a first conversation: 2 empty ceramic mugs, a closed plain notebook and a pencil, by a window onto mid-rise buildings and dry hills. |
| `areas-we-serve.jpg` | `/areas-we-serve/` (hero) | A late-morning view through a large window across the Truckee Meadows: mid-rise buildings, a parking lot, street trees and dry tan hills. |
| `area-reno.jpg` | `/areas-we-serve/reno-nv/` (hero) | A quiet commercial street with mid-rise buildings, street trees and a few parked cars, with dry hills at the end of the block. No readable signs or plates. |
| `area-carson-city.jpg` | `/areas-we-serve/carson-city-nv/` (hero) | A quiet tree-lined civic street of brick and light-stone buildings under a wide sky, with dry hills in the distance. No flags or lettering. |
| `area-truckee.jpg` | `/areas-we-serve/truckee-ca/` (hero) | A small Sierra mountain-town street with wooden storefronts and tall pines in summer light, no snow and no shop names. |
| `contact-desk.jpg` | `/contact/` (hero) | A phone lying face down beside a yellow legal pad with faint unreadable pencil lines, a pencil and a mug of coffee, by a window. |
| `recommendations-letters.jpg` | `/testimonials/` (hero; the old `/recommendations/` address redirects there) | 2 closed cream envelopes, a plain folder and a fountain pen on a worn leather blotter, with a high desert city beyond the window. |
| `remote-services.jpg` | `/remote-services/` (hero) | A phone lying face down, a short stack of plain paper folders and a closed laptop on a worn wooden desk by a window, with sagebrush hills outside. No screens showing, no text. |
| `faq-notebook.jpg` | `/faq/` (hero) | An open spiral notebook with soft, unreadable pencil scribbles, a pencil and a paper cup of coffee, by a window onto dry hills. |

Firm information, Privacy, Terms and the 404 page have no photos.

## Logo

`logo-wilkerson-consulting.png` is the designer-made typographic wordmark with a "W" mark (transparent background), used in the structured data. The header and footer use the same mark as inline SVG. It is not a client-supplied logo. Do not use the Brown Edwards or W.W. Nash signature images from the client emails.
