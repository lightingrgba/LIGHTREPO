// Blog articles. Text supports two inline marks:
//   **bold**   and   [link text](/path)   (app-relative paths get the visitor's locale)

export type Block =
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "ol"; items: string[] }
    | { type: "tip"; text: string }
    | { type: "table"; head: string[]; rows: string[][] }

export interface Article {
    slug: string
    title: string
    /** Meta description, ~150 characters. */
    description: string
    /** Short teaser for the blog index. */
    excerpt: string
    published: string
    updated: string
    readMinutes: number
    blocks: Block[]
}

const PUBLISHED = "2026-10-11"

export const articles: Article[] = [
    {
        slug: "lightburn-diode-laser-settings",
        title: "LightBurn Settings for Diode Lasers: A Practical Speed and Power Guide",
        description:
            "Starting speed and power settings for diode lasers in LightBurn, for engraving and cutting wood, leather, acrylic and more, plus how to dial them in.",
        excerpt:
            "Starting points for engraving and cutting the most common materials with a diode laser, and a simple method to fine-tune them for your machine.",
        published: PUBLISHED,
        updated: PUBLISHED,
        readMinutes: 8,
        blocks: [
            {
                type: "p",
                text: "Diode lasers are the most popular entry point into laser engraving, and LightBurn is the software most diode owners end up using. The hardest part for beginners is not the software itself but knowing **what speed and power to use**. This guide gives you sensible starting points and, more importantly, a repeatable way to find the perfect settings for your own machine.",
            },
            { type: "h2", text: "Why there is no single \"correct\" setting" },
            {
                type: "p",
                text: "Two diode lasers sold as \"10W\" can behave very differently. Real optical output, spot size, focus, air assist, and even the moisture in a piece of plywood all change the result. That is why every number in this article is a **starting point**, not a rule. Always confirm with a quick test on a scrap of the same material before running a real job.",
            },
            { type: "h2", text: "Check these LightBurn basics first" },
            {
                type: "ol",
                items: [
                    "**Device type:** most diode lasers run GRBL firmware. Add your laser in the Devices window and choose GRBL.",
                    "**Laser mode:** make sure GRBL laser mode is on (`$32=1`). Without it, the laser pauses at every corner and burns dark spots.",
                    "**Maximum power value:** the `S-value max` in LightBurn's Device Settings must match your controller's `$30` value (usually 1000). If they don't match, 50% in LightBurn will not be 50% on the machine.",
                    "**Focus:** a perfectly focused beam matters more than any setting. Use the focus tool or spacer that came with your laser every time you change material thickness.",
                ],
            },
            { type: "h2", text: "Starting settings by material" },
            {
                type: "p",
                text: "The table below assumes a typical 5–10W optical-output diode laser with air assist. Speeds are in mm/min, the unit most GRBL machines use. If your laser is weaker, lower the speed; if it is stronger, raise it.",
            },
            {
                type: "table",
                head: ["Material", "Job", "Speed (mm/min)", "Power", "Passes"],
                rows: [
                    ["Basswood / birch plywood 3 mm", "Engrave (fill)", "3000–6000", "30–60%", "1"],
                    ["Basswood / birch plywood 3 mm", "Cut", "200–400", "100%", "1–3"],
                    ["Veg-tan leather", "Engrave", "3000–5000", "20–40%", "1"],
                    ["Dark acrylic (cast)", "Engrave", "2000–4000", "40–70%", "1"],
                    ["Anodized aluminium", "Mark", "1000–2000", "80–100%", "1"],
                    ["Slate / stone tiles", "Engrave", "2000–3000", "60–90%", "1"],
                    ["Cardboard", "Cut", "600–1200", "60–90%", "1"],
                ],
            },
            {
                type: "tip",
                text: "Diode lasers cannot cut or engrave **clear or light-coloured acrylic** well: the blue wavelength passes straight through. Stick to dark, opaque acrylic, or use a CO2 laser for clear sheets.",
            },
            { type: "h2", text: "Engraving settings that make the biggest difference" },
            { type: "h3", text: "Line interval" },
            {
                type: "p",
                text: "Line interval is the distance between engraving lines. Most diode spots are around 0.08–0.15 mm, so a line interval of **0.08–0.1 mm** gives a solid fill without wasting time. Too large and you'll see stripes; too small and the wood over-burns.",
            },
            { type: "h3", text: "Overscanning" },
            {
                type: "p",
                text: "Enable **Overscanning** on fill layers. It lets the head reach full speed before it starts burning, which removes the dark edges you often see on the left and right of an engraving.",
            },
            { type: "h3", text: "Bi-directional fill and scan offset" },
            {
                type: "p",
                text: "Bi-directional fill engraves in both directions and roughly halves the time. If text looks blurry or doubled, set up **Scanning Offset Adjustment** in Device Settings to compensate for the small delay at high speed.",
            },
            { type: "h2", text: "Cutting with a diode laser" },
            {
                type: "ul",
                items: [
                    "**Use air assist.** It blows away smoke, prevents flare-ups and gives much cleaner edges.",
                    "**Several slower passes beat one very slow pass.** On 3 mm plywood, two or three passes at a moderate speed usually char less than one crawling pass.",
                    "**Lower the focus between passes** (\"Z step per pass\") on thicker material if your machine supports it.",
                    "**Order your layers** so inner shapes are cut before outer outlines, otherwise parts can drop and shift.",
                ],
            },
            { type: "h2", text: "Find your exact settings in five minutes" },
            {
                type: "p",
                text: "The fastest way to dial in a new material is LightBurn's built-in **Material Test**. It burns a grid of squares, each with a different speed and power combination, so you can pick the one that looks best. We wrote a step-by-step guide: [How to Run a Material Test in LightBurn](/blog/lightburn-material-test).",
            },
            {
                type: "p",
                text: "Once you find a combination you like, save it in LightBurn's **Material Library**. Next time you work with that material, you load it in one click instead of guessing again.",
            },
            { type: "h2", text: "Safety reminders" },
            {
                type: "ul",
                items: [
                    "Never leave a running laser unattended, especially when cutting.",
                    "Wear goggles rated for your laser's wavelength (typically 445–455 nm for blue diodes).",
                    "Do not laser PVC, vinyl or anything containing chlorine. It releases toxic, corrosive gas.",
                    "Vent smoke outside or through a proper filter.",
                ],
            },
        ],
    },
    {
        slug: "lightburn-material-test",
        title: "How to Run a Material Test in LightBurn (and Read the Results)",
        description:
            "Step-by-step guide to LightBurn's Material Test tool: set up a speed and power grid, run it, read the results and save the best settings to your library.",
        excerpt:
            "Stop guessing settings. Use LightBurn's Material Test grid to find the right speed and power for any material in a few minutes.",
        published: PUBLISHED,
        updated: PUBLISHED,
        readMinutes: 6,
        blocks: [
            {
                type: "p",
                text: "Every laser and every material is a little different. Instead of copying settings from forums and hoping for the best, LightBurn includes a **Material Test** tool that burns a grid of test squares, each with a different speed and power. In a few minutes you can see exactly how your machine behaves on a new material.",
            },
            { type: "h2", text: "Where to find the Material Test" },
            {
                type: "p",
                text: "Open LightBurn, connect your laser, and go to **Laser Tools → Material Test**. A window opens where you choose which two settings change across the grid (usually speed on one axis and power on the other) and how many steps to test.",
            },
            { type: "h2", text: "Step-by-step setup" },
            {
                type: "ol",
                items: [
                    "**Pick the mode.** Choose Fill for engraving tests, or Line for cutting and scoring tests.",
                    "**Set the rows and columns.** Five to ten steps on each axis is plenty. Start with speed on one axis and power on the other.",
                    "**Choose a range.** For a 10W diode engraving wood, try speed 1000–6000 mm/min and power 10–80%. For a CO2 laser, use the speed units your machine uses (often mm/s).",
                    "**Keep shapes small.** Squares of 5–8 mm with 2–3 mm spacing keep the test quick and save material.",
                    "**Turn on text labels** so each row and column is printed with its value. You'll thank yourself later.",
                    "**Focus the laser** on the test material, frame the job, and press Start.",
                ],
            },
            {
                type: "tip",
                text: "Run your test on a scrap from the **same sheet** you'll use for the real job. Two plywood sheets from different batches can need noticeably different settings.",
            },
            { type: "h2", text: "How to read the results" },
            {
                type: "ul",
                items: [
                    "**For engraving:** look for the square with even, solid colour and no heavy charring at the edges. Of several that look good, pick the fastest one. It saves time on every future job.",
                    "**For photos:** you want a smooth gradient from light to dark across the grid, without jumping from \"barely marked\" to \"burnt\".",
                    "**For cutting:** flip the test piece over. The best setting is the fastest one that cut cleanly all the way through without heavy burn marks on the back.",
                ],
            },
            { type: "h2", text: "Save it to the Material Library" },
            {
                type: "p",
                text: "Once you've found the winning settings, open the **Library** window and create an entry for that material and thickness. Next time, assign the library entry to a layer and LightBurn fills in speed, power, interval and passes for you. Over a few weeks you build a library tuned exactly to your machine.",
            },
            { type: "h2", text: "Common mistakes" },
            {
                type: "ul",
                items: [
                    "**Testing out of focus.** An unfocused test is useless: every square will look weak.",
                    "**Range too wide.** If half the grid is blank and the other half is burnt, narrow the range around the good area and test again.",
                    "**Forgetting air assist.** Run the test with the same air assist you'll use for the real job; it changes the result.",
                ],
            },
            {
                type: "p",
                text: "Need starting values for the first test? See our [diode laser settings guide](/blog/lightburn-diode-laser-settings) for typical speed and power ranges by material.",
            },
        ],
    },
    {
        slug: "connect-lightburn-ruida-controller",
        title: "How to Connect LightBurn to a Ruida CO2 Laser (USB and Ethernet)",
        description:
            "Connect LightBurn to a Ruida-controlled CO2 laser over USB or Ethernet: device setup, IP address settings, and fixes for the most common connection problems.",
        excerpt:
            "Set up your Ruida CO2 laser in LightBurn over USB or Ethernet, and fix the connection problems people run into most often.",
        published: PUBLISHED,
        updated: PUBLISHED,
        readMinutes: 7,
        blocks: [
            {
                type: "p",
                text: "Ruida controllers power a huge share of CO2 laser cutters, from small desktop machines to large production beds. LightBurn talks to Ruida controllers directly, so you can design, set up and run jobs without the manufacturer's older software. You can connect over **USB** or **Ethernet**; both work well.",
            },
            { type: "h2", text: "Add the laser in LightBurn" },
            {
                type: "ol",
                items: [
                    "Turn the laser on and connect the cable (USB or network).",
                    "In LightBurn, open the **Devices** window and click **Find My Laser**. LightBurn scans for connected controllers and usually detects a Ruida over USB automatically.",
                    "If it isn't found, choose **Create Manually**, select **Ruida**, then pick the connection type: USB/Serial or Ethernet/UDP.",
                    "Enter the bed size (width and height) and choose where the origin is. On most Ruida machines it is the **top-right** corner.",
                    "Click Finish and select the new device in the drop-down next to the Laser window.",
                ],
            },
            { type: "h2", text: "Connecting over USB" },
            {
                type: "p",
                text: "USB is the simplest option. On Windows 10 and 11 the driver normally installs on its own the first time you plug the laser in. If LightBurn doesn't see the machine:",
            },
            {
                type: "ul",
                items: [
                    "Try a different, shorter USB cable. Long or cheap cables are the most common cause of dropouts.",
                    "Plug directly into the computer, not into a USB hub.",
                    "Close any other laser software (such as RDWorks) that may be holding the port.",
                    "Check Windows Device Manager to confirm the controller appears under Ports or USB devices.",
                ],
            },
            { type: "h2", text: "Connecting over Ethernet" },
            {
                type: "p",
                text: "Ethernet is more reliable for long jobs and lets you place the computer farther from the machine. The controller and the computer must be on the **same network range**.",
            },
            {
                type: "ol",
                items: [
                    "On the laser's control panel, find the **IP address** (often under Menu → System → IP Config). Many Ruida controllers ship with **192.168.1.100**.",
                    "If you connect the laser directly to the computer with a cable, give the computer a fixed IP in the same range, for example **192.168.1.10**, subnet mask **255.255.255.0**.",
                    "If the laser is on your router, set its IP to a free address in your router's range (for example 192.168.0.150 if your network uses 192.168.0.x).",
                    "In LightBurn's Devices window, enter the controller's IP address for the Ruida Ethernet device.",
                ],
            },
            {
                type: "tip",
                text: "After changing the IP on the controller, **restart the laser**. Most Ruida controllers only apply a new network address after a power cycle.",
            },
            { type: "h2", text: "Check the basics before your first job" },
            {
                type: "ul",
                items: [
                    "**Origin and direction:** use the arrow buttons in the Move window. If the head moves the opposite way, the origin setting in LightBurn is wrong.",
                    "**Frame the job** before every run to confirm position and size.",
                    "**Power limits:** Ruida machines have minimum and maximum power per layer. Very low minimum power values can cause unlit lines on some tubes.",
                    "**Speed units:** Ruida speeds are in mm/s, not mm/min like most diode lasers.",
                ],
            },
            { type: "h2", text: "Troubleshooting" },
            {
                type: "table",
                head: ["Problem", "Likely cause", "Fix"],
                rows: [
                    ["Laser not found over USB", "Cable, port or another program", "Swap cable, direct port, close RDWorks"],
                    ["Ethernet times out", "Different IP ranges", "Put PC and laser on the same subnet"],
                    ["Job is mirrored", "Wrong origin corner", "Set origin to match the machine (often top-right)"],
                    ["Job starts in the wrong place", "Start From setting", "Check Absolute / Current Position / User Origin"],
                ],
            },
            {
                type: "p",
                text: "Once you're connected, use a [Material Test](/blog/lightburn-material-test) to build your settings library for the materials you cut most.",
            },
        ],
    },
    {
        slug: "lightburn-vs-lasergrbl",
        title: "LightBurn vs LaserGRBL: Which Laser Software Should You Use?",
        description:
            "LightBurn vs LaserGRBL compared: supported lasers, design tools, image engraving, ease of use and price, to help you pick the right laser software.",
        excerpt:
            "A fair comparison of the two most popular programs for hobby lasers: what each does well, and when it is worth upgrading to LightBurn.",
        published: PUBLISHED,
        updated: PUBLISHED,
        readMinutes: 7,
        blocks: [
            {
                type: "p",
                text: "If you own a diode laser, you've probably come across two names: **LaserGRBL** and **LightBurn**. Both can run your machine, but they are built for different needs. Here's an honest comparison to help you decide.",
            },
            { type: "h2", text: "The short answer" },
            {
                type: "ul",
                items: [
                    "**LaserGRBL** is free and does a good job of sending images and simple files to GRBL-based lasers.",
                    "**LightBurn** is paid software, but it is a complete design, layout and control tool that works with many more types of lasers. Most people who use their laser regularly, and almost everyone who sells what they make, end up on LightBurn.",
                ],
            },
            { type: "h2", text: "Side-by-side comparison" },
            {
                type: "table",
                head: ["", "LaserGRBL", "LightBurn"],
                rows: [
                    ["Price", "Free", "One-time licence"],
                    ["Supported controllers", "GRBL only", "GRBL, Ruida, TopWisdom, Smoothieboard, EZCad2 galvo and more"],
                    ["Laser types", "Mostly diode", "Diode, CO2 and fibre/galvo"],
                    ["Built-in design tools", "Very limited", "Full vector editor: shapes, text, node editing, offsets, arrays"],
                    ["Layers with different settings", "No", "Yes, unlimited layers with their own speed, power and passes"],
                    ["Image engraving", "Good", "Excellent, with more dithering modes and adjustments"],
                    ["Material library", "No", "Yes"],
                    ["Camera alignment", "No", "Yes, with supported USB cameras"],
                ],
            },
            { type: "h2", text: "Where LaserGRBL shines" },
            {
                type: "ul",
                items: [
                    "It costs nothing, which is great while you're still deciding whether laser engraving is for you.",
                    "Raster image engraving is straightforward and gives good results on GRBL machines.",
                    "It is lightweight and runs on older computers.",
                ],
            },
            { type: "h2", text: "Where LightBurn is worth paying for" },
            { type: "h3", text: "You design inside the software" },
            {
                type: "p",
                text: "With LaserGRBL you usually prepare files in another program first. In LightBurn you can type text, draw shapes, weld and offset paths, edit nodes and arrange copies, all in one place. That saves a lot of back-and-forth.",
            },
            { type: "h3", text: "Cut and engrave in one job" },
            {
                type: "p",
                text: "Layers let you engrave a logo, score a fold line and cut the outline in a single run, each with its own speed, power and number of passes. That's essential for signs, coasters, boxes and almost every product you'd want to sell.",
            },
            { type: "h3", text: "It grows with you" },
            {
                type: "p",
                text: "If you later buy a CO2 laser with a Ruida controller, or a galvo fibre laser, LightBurn supports it with the same interface. Your skills and material library carry over.",
            },
            { type: "h3", text: "Repeatable results" },
            {
                type: "p",
                text: "The Material Library and [Material Test tool](/blog/lightburn-material-test) make results repeatable. Once you've found the right settings for a material, you never have to find them again.",
            },
            { type: "h2", text: "Our recommendation" },
            {
                type: "p",
                text: "Start with LaserGRBL if you've just unboxed a diode laser and want to experiment for free. Move to LightBurn as soon as you want to design your own projects, combine cutting and engraving, run a CO2 or fibre machine, or sell what you make. The time it saves pays for the licence quickly.",
            },
            {
                type: "p",
                text: "Ready to switch? [Get LightBurn Pro](/) with a one-time payment and instant delivery, then follow our [diode laser settings guide](/blog/lightburn-diode-laser-settings) to get great results from day one.",
            },
        ],
    },
    {
        slug: "lightburn-galvo-fiber-laser-guide",
        title: "Getting Started with LightBurn on a Galvo Fiber Laser (EZCad2)",
        description:
            "Set up LightBurn with an EZCad2-based galvo fiber laser: connecting the device, lens and correction settings, and starting parameters for marking metal.",
        excerpt:
            "Switching from EZCad to LightBurn on your fiber laser: device setup, lens settings and the key parameters for clean metal marking.",
        published: PUBLISHED,
        updated: PUBLISHED,
        readMinutes: 8,
        blocks: [
            {
                type: "p",
                text: "Galvo fiber lasers are fantastic for marking metal: fast, precise and permanent. Most of them ship with **EZCad2**, which works but is dated and hard to learn. LightBurn supports EZCad2-based (BJJCZ) controllers, so you can use the same modern interface you may already know from diode or CO2 lasers.",
            },
            {
                type: "tip",
                text: "Before you start, check that your LightBurn licence covers **galvo devices**. LightBurn licences galvo support separately from GCode and DSP (Ruida) machines.",
            },
            { type: "h2", text: "Before you connect" },
            {
                type: "ul",
                items: [
                    "**Back up your EZCad folder.** It contains your machine's correction (.cor) file and settings. You'll need them in LightBurn.",
                    "**Close EZCad.** Only one program can talk to the controller at a time.",
                    "Note your **lens size** (field size), for example 110 × 110 mm or 175 × 175 mm, and your laser source power and type (Q-switched or MOPA).",
                ],
            },
            { type: "h2", text: "Adding the galvo laser in LightBurn" },
            {
                type: "ol",
                items: [
                    "Connect the laser by USB and power it on.",
                    "In the **Devices** window, click **Find My Laser** or **Create Manually**, and choose the galvo / EZCad2 (BJJCZ) device type.",
                    "Enter the **lens field size** exactly as in EZCad.",
                    "Import your machine's **correction (.cor) file** in the galvo device settings, or copy the lens correction values from EZCad. This is what keeps squares square and circles round.",
                    "Set the laser source type and maximum frequency range to match your machine.",
                ],
            },
            { type: "h2", text: "Key galvo settings explained" },
            {
                type: "table",
                head: ["Setting", "What it does", "Typical starting point"],
                rows: [
                    ["Speed", "How fast the beam moves (mm/s)", "1000–3000 mm/s for marking"],
                    ["Power", "Percentage of the source's power", "40–90% depending on the metal"],
                    ["Frequency (kHz)", "Pulses per second; lower is hotter and deeper", "20–60 kHz"],
                    ["Q-pulse width (MOPA only)", "Length of each pulse; affects colour and finish", "Varies, test it"],
                    ["Line interval (hatch)", "Distance between fill lines", "0.01–0.05 mm"],
                ],
            },
            { type: "h2", text: "Starting points for common jobs" },
            {
                type: "ul",
                items: [
                    "**Dark mark on stainless steel:** slower speed, high power and a fine hatch (around 0.01–0.02 mm), sometimes with two passes at crossed angles.",
                    "**Anodized aluminium:** high speed and low-to-medium power. The goal is to remove the coloured layer, not to burn into the metal.",
                    "**Deep engraving:** many fast passes rather than one slow pass, with a small Z step if your machine has motorised focus.",
                    "**Colour marking (MOPA):** requires careful tests of speed, frequency and pulse width. Small changes produce very different colours.",
                ],
            },
            {
                type: "p",
                text: "Use the [Material Test tool](/blog/lightburn-material-test) with speed and frequency on the two axes. It is the quickest way to find a clean, high-contrast mark on a new metal.",
            },
            { type: "h2", text: "Focus and framing" },
            {
                type: "p",
                text: "Galvo lasers have a short, sharp focal point. Use the red-dot preview (framing) to position your design, and set the working height precisely, often with the focus distance from your lens's specification. A few millimetres out of focus makes marks weak and blurry.",
            },
            { type: "h2", text: "Safety" },
            {
                type: "ul",
                items: [
                    "Fiber lasers (around 1064 nm) are **invisible** and can cause permanent eye damage. Always use the correct goggles and an enclosure where possible.",
                    "Metal marking produces fine fumes. Use extraction or a filter.",
                    "Never mark reflective or unknown materials without testing at low power first.",
                ],
            },
        ],
    },
]

export function getArticle(slug: string): Article | undefined {
    return articles.find((a) => a.slug === slug)
}
