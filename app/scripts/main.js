'use strict';

// Create an instance
var wavesurfer = Object.create(WaveSurfer);

// Init & load mp3
document.addEventListener('DOMContentLoaded', function () {
    var options = {
        container     : document.querySelector('#vm-waveform-1'),
        waveColor     : 'red',
        progressColor : 'orange',
        loaderColor   : 'orange',
        cursorColor   : 'black',
        markerWidth   : 2
    };

    if (location.search.match('scroll')) {
        options.minPxPerSec = 20;
        options.scrollParent = true;
    }

    if (location.search.match('canvas')) {
        options.renderer = 'Canvas';
    }

    if (location.search.match('svg')) {
        options.renderer = 'SVG';
    }

    /* Progress bar */
    var progressDiv = document.querySelector('#progress-bar');
    var progressBar = progressDiv.querySelector('.progress-bar');
    progressBar.style.width = '100%';
    wavesurfer.on('ready', function () {
        progressDiv.style.display = 'none';
    });

    // Init
    wavesurfer.init(options);
    // Load audio from URL
    wavesurfer.load('media/vm-waveform-1.mp3');

    // Start listening to marks being reached by cursor
    wavesurfer.bindMarks();
    // Start listening to drag'n'drop on document
    // wavesurfer.bindDragNDrop();
});

// Play at once when ready
// Won't work on iOS until you touch the page
wavesurfer.on('ready', function () {
    wavesurfer.play();
});

// Bind buttons and keypresses
wavesurfer.on('ready', function () {
    var eventHandlers = {
        'play': function () {
            wavesurfer.playPause();
        },

        'green-mark': function () {
            wavesurfer.mark({
                id: 'up',
                color: 'rgba(0, 255, 0, 0.5)'
            });
        },

        'red-mark': function () {
            wavesurfer.mark({
                id: 'down',
                color: 'rgba(255, 0, 0, 0.5)'
            });
        },

        'back': function () {
            wavesurfer.skipBackward();
        },

        'forth': function () {
            wavesurfer.skipForward();
        },

        'toggle-mute': function () {
            wavesurfer.toggleMute();
        }
    };

    document.addEventListener('keydown', function (e) {
        var map = {
            32: 'play',       // space
            38: 'green-mark', // up
            40: 'red-mark',   // down
            37: 'back',       // left
            39: 'forth'       // right
        };
        if (e.keyCode in map) {
            var handler = eventHandlers[map[e.keyCode]];
            e.preventDefault();
            handler && handler(e);
        }
    });

    document.addEventListener('click', function (e) {
        var action = e.target.dataset && e.target.dataset.action;
        if (action && action in eventHandlers) {
            eventHandlers[action](e);
        }
    });
});

// Flash when reaching a mark
wavesurfer.on('mark', function (marker) {
    var markerColor = marker.color;

    setTimeout(function () {
        marker.update({ color: 'yellow' });
    }, 100);

    setTimeout(function () {
        marker.update({ color: markerColor });
    }, 300);
});





// _init : function() {
//     this.trigger = this.el.querySelector( 'a.gn-icon-menu' );
//     this.menu = this.el.querySelector( 'nav.gn-menu-wrapper' );
//     this.isMenuOpen = false;
//     this.eventtype = mobilecheck() ? 'touchstart' : 'click';
//     this._initEvents();
 
//     var self = this;
//     this.bodyClickFn = function() {
//         self._closeMenu();
//         this.removeEventListener( self.eventtype, self.bodyClickFn );
//     };
// }

// this.trigger.addEventListener( 'mouseover', function(ev) { self._openIconMenu(); } );
// this.trigger.addEventListener( 'mouseout', function(ev) { self._closeIconMenu(); } );

// this.menu.addEventListener( 'mouseover', function(ev) {
//     self._openMenu(); 
//     document.addEventListener( self.eventtype, self.bodyClickFn ); 
// } );

// this.trigger.addEventListener( this.eventtype, function( ev ) {
//     ev.stopPropagation();
//     ev.preventDefault();
//     if( self.isMenuOpen ) {
//         self._closeMenu();
//         document.removeEventListener( self.eventtype, self.bodyClickFn );
//     }
//     else {
//         self._openMenu();
//         document.addEventListener( self.eventtype, self.bodyClickFn );
//     }
// } );

// this.menu.addEventListener( this.eventtype, function(ev) { ev.stopPropagation(); } );

// _initEvents : function() {
//     var self = this;
 
//     if( !mobilecheck() ) {
//         this.trigger.addEventListener( 'mouseover', function(ev) { self._openIconMenu(); } );
//         this.trigger.addEventListener( 'mouseout', function(ev) { self._closeIconMenu(); } );
     
//         this.menu.addEventListener( 'mouseover', function(ev) {
//             self._openMenu(); 
//             document.addEventListener( self.eventtype, self.bodyClickFn ); 
//         } );
//     }
//     this.trigger.addEventListener( this.eventtype, function( ev ) {
//         ev.stopPropagation();
//         ev.preventDefault();
//         if( self.isMenuOpen ) {
//             self._closeMenu();
//             document.removeEventListener( self.eventtype, self.bodyClickFn );
//         }
//         else {
//             self._openMenu();
//             document.addEventListener( self.eventtype, self.bodyClickFn );
//         }
//     } );
//     this.menu.addEventListener( this.eventtype, function(ev) { ev.stopPropagation(); } );
// },
// _openIconMenu : function() {
//     classie.add( this.menu, 'gn-open-part' );
// },
// _closeIconMenu : function() {
//     classie.remove( this.menu, 'gn-open-part' );
// },
// _openMenu : function() {
//     if( this.isMenuOpen ) return;
//     classie.add( this.trigger, 'gn-selected' );
//     this.isMenuOpen = true;
//     classie.add( this.menu, 'gn-open-all' );
//     this._closeIconMenu();
// },
// _closeMenu : function() {
//     if( !this.isMenuOpen ) return;
//     classie.remove( this.trigger, 'gn-selected' );
//     this.isMenuOpen = false;
//     classie.remove( this.menu, 'gn-open-all' );
//     this._closeIconMenu();
// }