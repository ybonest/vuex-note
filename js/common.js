window.onload = function(){
  var ele = document.querySelector(".yboflag");
  var url = ele.src;
  ele.src = "https://ybonest.github.io/vue-note/html/" + url;
}