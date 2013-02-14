﻿require.config({

    paths: {
        'backbone': 'JsLibraries/backbone',
        'underscore': 'JsLibraries/underscore',
        'marionette': 'JsLibraries/backbone.marionette',
        'handlebars': 'JsLibraries/handlebars',
        'bootstrap': 'JsLibraries/bootstrap',
        'datatablesBase': 'JsLibraries/jquery.dataTables',
        'datatablesExt': 'JsLibraries/jquery.dataTables.extensions',
        'datatables': 'JsLibraries/jquery.dataTables.bootstrap.pagination',
    },

    shim: {
        bootstrap: {
            deps: ["jquery"],
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },
        handlebars: {
            exports: "Handlebars"
        },
        dataTable: {
            deps: ['jquery']
        },
        datatablesBase: {
            depts: ['jquery']
        },
        datatablesExt: {
            deps: ['datatablesBase'],
        },
        datatables: {
            deps: ['datatablesExt']
        }

    }
});

define('app', ['jquery', 'JsLibraries/backbone.modelbinder', 'marionette', 'handlebars', 'JsLibraries/backbone.marionette.extend'],
    function (jquery, modelBinder, marionette, handlebars) {


        window.$ = jquery;
        window.jquery = jquery;

        window.Backbone.ModelBinder = modelBinder;
        window.Backbone.Marionette = marionette;
        window.Handlebars = handlebars;

        window.NzbDrone = new Backbone.Marionette.Application();
        window.NzbDrone.Series = {};
        window.NzbDrone.Series.Edit = {};
        window.NzbDrone.Series.Delete = {};
        window.NzbDrone.AddSeries = {};
        window.NzbDrone.AddSeries.New = {};
        window.NzbDrone.AddSeries.Existing = {};
        window.NzbDrone.AddSeries.RootFolders = {};
        window.NzbDrone.Quality = {};
        window.NzbDrone.Shared = {};

        window.NzbDrone.Constants = {
            ApiRoot: '/api'
        };


        window.NzbDrone.addInitializer(function (options) {

            console.log('starting application');

            NzbDrone.ModelBinder = new Backbone.ModelBinder();

            //TODO: move this out of here
            Handlebars.registerHelper("formatStatus", function (status, monitored) {
                if (!monitored) return '<i class="icon-pause grid-icon" title="Not Monitored"></i>';
                if (status === 'Continuing') return '<i class="icon-play grid-icon" title="Continuing"></i>';

                return '<i class="icon-stop grid-icon" title="Ended"></i>';
            });

            NzbDrone.addRegions({
                mainRegion: '#main-region',
                notificationRegion: '#notification-region',
                modalRegion: '#modal-region'
            });
        });

        window.NzbDrone.start();

        return NzbDrone;
    });





