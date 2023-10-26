// -- mitä koodi tekee:
// Tämä hallitsee kaikkea liittyen kortin kääntö animaatioon. Kääntö laukaistaan muusta koodista käyttäen: $("#kysymysLaatikko").flip(); koodin pätkää. Ennen tätä tulee tehdä $("#kysymysLaatikko").rotator();.Tämä koodi on alunperin löydettävissä seuraavasta linkistä: https://www.jqueryscript.net/demo/customizable-element-rotator/
// --

(function($) {
	var Flip = {
		run: function( options ) {
			// animaation asetukset.
			var sets = {  	
					perspective: 1000,
				//   trigger: 'click',
					rotateduration: 0.3,
					scaleduration: 0.35,
					scale: 1.2,
					transition: 'ease',
					direction: 'horizontal',
					width: 140, 
					height: 230,
					front: '.front',
					back: '.back',
			}
			//Merging default options with user's settings
			sets = $.extend( sets, options );

			return sets; 
		},
		rotate: function( elem, params, degrees ) {

			var degreeAxis = degrees[1],
			rotateType = degrees[0],
			scaleduration = params.scaleduration * 1000,
			rotateduration = params.rotateduration * 1000,
			front = elem.find(params.front),
			back = elem.find(params.back);

			//Merging front and back panels for stylize
			var faces = front.add(back);

			//Combined styles for back and front panels
			var combinedCss = {
				"backface-visibility": "hidden",
				"-webkit-transform-style": "preserve-3d",
				"transform-style": "preserve-3d",
				"position": "absolute",
				"z-index": "1",
				"width": params.width,
				"height": params.height,
				"background": params.background,
			},
			//Styles for parent container, which contains back and front panels
			selectorCss = {
				"perspective": params.perspective,
				"-webkit-transform-style": "preserve-3d",
				"transform-style": "preserve-3d",
				"width": params.width,
				"height": params.height 
			},
			//Separates styles for back panel's initial transform options
			backPanelCss = {
				"transform": "scale(1) " + rotateType +"("+ degreeAxis +"deg)"
			};
			
			elem.css(selectorCss);
			back.css(backPanelCss);
			faces.css(combinedCss);
			
			faces.css({
				"transition": "all " + params.rotateduration + "s " + params.transition
			});

			// peli loppuu boolean
			var peliLoppu = false;

			//Rotation counter
			var cnt = 0;
			
			// käännä kortti kerran. Laukaisee kortin käännös funktion.
			$.fn.flip = function() {
				korttikaanna();
			}

			// kun peli loppuu, vaihda boolean todeksi.
			$.fn.loppu = function() {
				peliLoppu = true;
			}

			// kortin kääntö tapahtuu täälllä.
			function korttikaanna () {
				// jos peli loppuu, lopettaa koodin kääntämisen.
				if (peliLoppu == true) {
					// lopettaa rotator koodin
					return;
				}

				//laskuri kortin käännöille nousee joka käänös.
				cnt++;
				
				// jos käännön laskuri on parillinen, sulkee kortin. Toisin se avaa kortin.
				if (cnt % 2 == 0) {
						// sulkee kortin. Kortin sulkemis animaatio.
						setTimeout(function(){
							front.css({'transform':'scale('+  params.scale +') '+ rotateType +'('+ degreeAxis +'deg)','z-index': '1'});
							back.css({'transform':'scale('+  params.scale +') '+ rotateType +'('+ degreeAxis*2 +'deg)','z-index': '1'});
							$('.overlay').css({"background-color":"rgba(0, 0, 0, 0.0)", "transition":"background-color 0.5s ease"});
							setTimeout(function(){
								front.css({'transform':'scale('+  params.scale +') '+ rotateType +'(0deg)','z-index': '1'});	
								back.css({'transform':'scale('+  params.scale +') '+ rotateType +'('+ degreeAxis +'deg)','z-index': '1'});
								setTimeout(function(){
									front.css({'transform':'scale(1) '+ rotateType +'(0deg)','z-index': '1', 'transform':'rotate(-45deg)'});
									back.css({'transform':'scale(1) '+ rotateType +'('+ degreeAxis +'deg)','z-index': '1'});
										$('.overlay').css({"z-index":"-1", "transition":"background-color 0.5s ease"});
								},scaleduration);
							},rotateduration);              		
						},500);
				} else {
					// avaa kortin. Kortin avaus animaatio.
					setTimeout(function(){
						front.css({'transform':'scale('+  params.scale +') '+ rotateType +'(0deg)','z-index': '1'});
						back.css({'transform':'scale('+  params.scale +') '+ rotateType +'('+ degreeAxis +'deg)','z-index': '1'});
					$('.overlay').css({"background-color":"rgba(0, 0, 0, 0.7)","z-index":"1", "transition":"background-color 0.5s ease"});
						setTimeout(function(){
							front.css({'transform':'scale('+  params.scale +') '+ rotateType +'('+ degreeAxis +'deg)','z-index': '1'});	
							back.css({'transform':'scale('+  params.scale +') '+ rotateType +'('+ degreeAxis*2 +'deg)','z-index': '1', 'zoom':'2.7'});	
							setTimeout(function(){
								front.css({'transform':'scale(1) '+ rotateType +'('+ degreeAxis +'deg)','z-index': '1'});
								back.css({'transform':'scale(1) '+ rotateType +'('+ degreeAxis*2 +'deg)','z-index': '1'});
							},scaleduration);
						},rotateduration);
					},500);
				}
			}

		},
		// kääntö asetukset.
		getDirection: function( params ) {
			switch(params) {      
				case "horizontal" :  var rotateAxis = "rotatey", degree = 180; break;
				case "horizontalReverse" :  var rotateAxis = "rotatey", degree = -180; break;
				case "vertical" :  var rotateAxis = "rotatex", degree = -180; break;
				case "verticalReverse" :  var rotateAxis = "rotatex", degree = 180; break;
			}

			var degreeparams = [rotateAxis, degree];

			return degreeparams;
		},
	};

	// aloittaa koodin ja asettaa asetukset. Tämän jälkeen kortin kääntäminen on mahdollista.
	$.fn.rotator = function( options ) {
		this.each(function() {
			var settings = Flip.run((options || {}));
			var degrees = Flip.getDirection(settings.direction);

			return Flip.rotate($(this), settings, degrees);
		});
	}
		
})(jQuery);
