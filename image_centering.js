(async function() {
	let aboutAction
	const id = "image_centering"
	const name = "Image Centering"
	const icon = "center_focus_strong"
	const author = "SirJain"
	const links = {
		website: "https://twitter.com/SirJain2",
		discord: "https://discord.gg/wM4CKTbFVN"
	}
	Plugin.register(id, {
		title: name,
		icon,
		author,
		description: "Adds a button that centers the image view in an Image format.",
		about: "This plugin adds a button that allows you to reset your view in the Image format.\n## How to use\nTo use this plugin, go to `Tools > Center Image View`. Make sure you are in the Image format. There will be a confirmation message displayed on-screen.\n\nPlease report any bugs or suggestions you may have.",
		tags: ["Customization", "Format: Image", "UX"],
		version: "1.0.0",
		min_version: "4.2.0",
		variant: "both",
		oninstall: () => showAbout(true),
		onload() {
			addAboutButton()

			MenuBar.addAction(
				new Action({
					id: 'image_center_button',
					name: 'Center Image View',
					icon: 'center_focus_strong',
					description: 'Center the view of your image',
					condition: () => Format?.id == "image",
					click() {
						// == TEMPORARY MARGINS ==
						// margin-top: 334px;
						// margin-right: 387px;
						// margin-bottom: 334px;
						// margin-left: 387px;

						const viewport = document.getElementById("uv_frame")
						viewport.style.setProperty("margin-top", "334px", "important");
						viewport.style.setProperty("margin-right", "387px", "important");
						viewport.style.setProperty("margin-bottom", "334px", "important");
						viewport.style.setProperty("margin-left", "387px", "important");
						Blockbench.showQuickMessage("Centered!", 2000);
					}
				}), 'tools'
			)
		},
		onunload() {
			aboutAction.delete()
			MenuBar.removeAction("tools.image_center_button")
			MenuBar.removeAction(`help.about_plugins.about_${id}`)
		}
	})

	function addAboutButton() {
		let about = MenuBar.menus.help.structure.find(e => e.id === "about_plugins")
		if (!about) {
			about = new Action("about_plugins", {
				name: "About Plugins...",
				icon: "info",
				children: []
			})
			MenuBar.addAction(about, "help")
		}
		aboutAction = new Action(`about_${id}`, {
			name: `About ${name}...`,
			icon,
			click: () => showAbout()
		})
		about.children.push(aboutAction)
	}

	function showAbout(banner) {
		const infoBox = new Dialog({
			id: "about",
			title: name,
			width: 780,
			buttons: [],
			lines: [`
                <style>
					dialog#about .dialog_title {
						padding-left: 0;
						display: flex;
						align-items: center;
						gap: 10px;
					}

					dialog#about .dialog_content {
						text-align: left!important;
						margin: 0!important;
					}

					dialog#about .socials {
						padding: 0!important;
					}

					dialog#about #banner {
						background-color: var(--color-accent);
						color: var(--color-accent_text);
						width: 100%;
						padding: 0 8px
					}

					dialog#about #content {
						margin: 24px;
					}
                </style>
                ${banner ? `<div id="banner">This window can be reopened at any time from <strong>Help > About Plugins > ${name}</strong></div>` : ""}
                <div id="content">
                	<h1 style="margin-top:-10px">${name}</h1>
					<p>placeholder</p>
					<div class="socials">
						<a href="${links["website"]}" class="open-in-browser">
							<i class="icon material-icons" style="color:#33E38E">language</i>
							<label>By ${author}</label>
						</a>
						<a href="${links["discord"]}" class="open-in-browser">
							<i class="icon fab fa-discord" style="color:#727FFF"></i>
							<label>Discord Server</label>
						</a>
					</div>
                </div>
            `]
		}).show()
		$("dialog#about .dialog_title").html(`
    <i class="icon material-icons">${icon}</i>
    ${name}
    `)
	}
})()