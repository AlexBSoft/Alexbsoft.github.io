// Скрипты для плеера


jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
			loop = 2,
			suffle = 2,
			//Путь к директории, откуда плеер будет тащить музыку
            mediaPath = 'https://archive.org/download/mythium/',
			//Расширения музыки. Можно оставить пустым если там .mp3 или .ogg
            extension = '',
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text(tracks[index].track);
            }).bind('pause', function () {
                playing = false;
                npAction.text('...');
            }).bind('ended', function () {
                npAction.text('...');
				if (loop == 1){
					var looptrack1 = index + 1;
					var looptrack = looptrack1 - 1;
					loadTrack(looptrack);
                    audio.load();
					audio.play();
				} else if (suffle == 1){
					var suffletrack = Math.floor(Math.random() * (trackCount - 1 + 1)) + 1;
					loadTrack(suffletrack);
					audio.play();
				}
                else if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
				if (suffle == 1){
					var suffletrack = Math.floor(Math.random() * (index - 1 + 1)) + 1;
					loadTrack(suffletrack);
					audio.play();
				}
                else if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
			// Самая офигенная функция: функция скачивания
			btnDwn = $('#btnDwn').click(function () {
				
				//делаем салатик из путей к файлу
				var dwntarget = mediaPath + tracks[index].file + extension;
				
				//фигачим ссылку и качаем её
				var link = document.createElement('a');
				link.setAttribute('href',dwntarget);
				link.setAttribute('download','download');
				onload=link.click();

            }),
            btnNext = $('#btnNext').click(function () {
				if (suffle == 1){
					var suffletrack = Math.floor(Math.random() * (trackCount - 1 + 1)) + 1;
					loadTrack(suffletrack);
					audio.play();
				}
                else if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
			btnLoop = $('#btnLoop').click(function () {
				if(loop == 1){
				document.getElementById('btnLoop').style.color = '';
                loop = 2;
			   //alert ('loop off');
			   }else{
				document.getElementById('btnLoop').style.color = '#4285f4';
				loop = 1;
				suffle = 2;
				document.getElementById('btnSuffle').style.color = '';				
				//alert ('loop on');
			   }
            }),
			btnSuffle = $('#btnSuffle').click(function () {
				if(suffle == 1){
				document.getElementById('btnSuffle').style.color = '';
                suffle = 2;
			    //alert ('suffle off');
			   }else{
				document.getElementById('btnSuffle').style.color = '#4285f4';  
				suffle = 1;
				loop = 2;
				document.getElementById('btnLoop').style.color = '';
				//alert ('suffle on');
				
			   }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
			//хз нафига, но он умеет сам определять расширение (огг или мп3)
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});
