# Wilkerson Consulting: website images

AI-generated illustrative photographs for the Wilkerson Consulting website. They are not photos of the business owner, staff, clients, or the firm's actual office.

Generated with the Higgsfield connector, model **GPT Image 2.6** (quality: high, resolution: 2K, 16:9). Web files below were resized to a maximum width of 1920px and compressed as JPEG under ~400KB. Original 2688×1520 PNG downloads are in `raw/`.

No client logo files are included. The form asked for a logo to be designed; there was no Drive assets link and no current website to take a logo from. Use a typographic wordmark reading "Wilkerson Consulting". Do not use the Brown Edwards or W.W. Nash signature images from the client emails.

| File | Use | What it shows |
| --- | --- | --- |
| `hero-office-desk.jpg` | Home hero (1920×1086, 313 KB) | A sunlit walnut desk by a large window, with an open laptop showing unlabeled abstract charts, a coffee cup, a plant, cream folders, and a brass desk lamp. Through the window, a high-desert city with snow-capped Sierra-like mountains and mid-rise buildings, and no readable signs. No people. |
| `construction-accounting.jpg` | Construction Accounting (1920×1086, 325 KB) | A tidy job-trailer desk in daylight: a yellow hard hat, rolled unmarked blueprints, a wood ruler, a calculator, cream folders, and a laptop showing a soft unlabeled Gantt-like chart with no readable text. A construction site is visible through the window. No people. |
| `manufacturing-cost-accounting.jpg` | Manufacturing cost accounting (1920×1086, 324 KB) | An industrial office desk looking onto a blurred empty machine shop: unmarked metal parts in trays, a closed notebook, a calculator, plants, and a monitor with colorful unlabeled charts. No people and no logos. |
| `attorney-trust-accounting.jpg` | Attorney Trust Accounting (1920×1086, 388 KB) | A sunlit wooden desk with cloth-bound ledgers with blank labels, a wooden tray of plain folders, a brass paperweight, a fountain pen on a leather blotter, and a leafy plant. No people, seals, or readable text. |
| `forensic-accounting.jpg` | Forensic Accounting (1920×1086, 329 KB) | Generic hands only (no face) comparing two stacks of highlighted spreadsheet printouts, with a yellow highlighter, a pencil, and a magnifying loupe on the desk. Cell grids are visible; numbers and labels are not readable. |

## Logo files

None. Use a typographic wordmark, as noted above.

## Failures

The first batch of five hit a temporary GPT Image rate limit on the construction-accounting image. That one was retried after the other four completed, and all five finished successfully. No images failed in the end.

## Web copies added during the build

Each photo also has a `-1200.jpg` and `-800.jpg` copy (same image, resized and compressed) that the pages load through `srcset` so phones download a smaller file. `logo-wilkerson-consulting.png` is the designer-made wordmark (transparent background), used in the structured data. It is not a client-supplied logo.
