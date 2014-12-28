module BuildHelpers
	include ActiveSupport::Inflector
	def build_for which
		{ size:
			[
				{
					title: 		'Scale', 
				  options: 	[25.5,24.75], 
				  hint: 		"The length from nut to bridge"
				},	
				{
					title: 		'Body size', 
				  options: 	["Normal","7/8"], 
				  hint: 		"Sharktail guitars are smaller and lighter than normal"
				},
				{
					title: 		'Nut', 
				  options: 	["1 5/8","1 11/16"], 
				  hint: 		"The width at the nut in inches"
				},
				{
					title: 		'Neck', 
				  options: 	["Thin", "Thick"], 
				  hint: 		"The 'depth' of the neck."
				},
				{
					title: 		'Neck shape', 
				  options: 	["C", "D", "V"], 
				  hint: 		"The shape of the neck contour"
				}															
			],
		hw: [

				{
					title: 		'Neck Pickup', 
				  options: 	["Duncan", "DiMarzio", "Lace"], 
				  hint: 		"Single coil"
				},		
				{
					title: 		'Bridge Pickup', 
				  options: 	["Duncan", "DiMarzio", "Lace"], 
				  hint: 		"Humbucker"
				},	
				{
					title: 		'Tuners', 
				  options: 	["Sperzel", "Gotoh", "Hipshot"], 
				  hint: 		"aka Machine heads"
				},	
				{
						title: 		'Bridge', 
					  options: 	["Kahler", "Floyd Rose"], 
					  hint: 		"Fixed"
				},												

		],
		aes: [

				{
					title: 		'Accent Wood', 
				  options: 	["Maple", "Curly Maple", "Walnut", "Paduck"], 
				  hint: 		"'Pickguard' top"
				},		
				{
					title: 		'Accent Color', 
				  options: 	["Neutral", "Red", "Green", "Blue"], 
				  hint: 		"Color of the top wood piece"
				},	
				{
					title: 		'Base wood', 
				  options: 	["Walnut", "Mahagony"], 
				  hint: 		"Wings of the guitar"
				},	
				{
						title: 		'Neck through wood', 
					  options: 	["Maple/Walnut", "Maple/Mahagony"], 
					  hint: 		"Sharktail's are neck throughs made up of 5 1/2 pieces"
				},	
				{
						title: 		'Fretboard wood', 
					  options: 	["Maple", "Ebony"], 
					  hint: 		"Sharktail's are neck throughs made up of 5 1/2 pieces"
				}												

		],
		gw: [
     {
     	title: "Headless",
	    options: ["No","Yes"],
	    hint: "The tuners on the bridge"
	   },			
     {
     	title: "Tremolo",
	    options: ["None","Floyd Rose","Kahler"],
	    hint: "Choose your tremolo"
	   },
     {
     	title: "Fanned Frets",
	    options: ["None","5th Fret","8th Fret"],
	    hint: "Do you want fanned frets?"
	   },
     {
     	title: "Piezo",
	    options: ["None","Ghost","Other"],
	    hint: "For the accoustic sound"
	   }	   	   
		]	

		}[which]
	end

	def id_for title
		parameterize(title).gsub('-','_')
	end
end
