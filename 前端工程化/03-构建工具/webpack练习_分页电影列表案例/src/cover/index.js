import $ from "jquery";
import styles from "./index.module.less";
import videoUrl from "@/assets/movie.mp4";
import audioUrl from "@/assets/music.mp3";

function init(){
  const container = $("<div>").addClass(styles.container).appendTo('#app');
  const video = $('<video>').prop('src', videoUrl).prop('autoplay', true).prop('loop', true).addClass(styles.video).appendTo(container);
  const audio = $('<audio>').prop('src', audioUrl).prop('autoplay', true).prop('loop', true).appendTo(container);
  $('<h1>').text('豆瓣电影').addClass(styles.title).appendTo(container);

  $(window).on('scroll', function(){
    const scrollTop = document.documentElement.scrollTop;
    const vHeight = document.documentElement.clientHeight;
    if(scrollTop >= vHeight){
      video[0].pause();
      audio[0].pause();
    }else{
      video[0].play();
      audio[0].play();
    }
  });
}

init();