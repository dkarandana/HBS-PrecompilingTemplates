import App from './App';
import jQuery from 'jquery';

import views from './views';


$(function(){
    var $app = $('#app');

    var header = views.header({
        title: 'Test Title'
    });


    $app.html( header );
})



console.log(views.header({
    title:'Test Title'
}));

console.log('index.js', App, jQuery().jquery );