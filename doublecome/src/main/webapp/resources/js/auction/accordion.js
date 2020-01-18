$(document).ready(function(){
  $(".accordion ul").hide();
  // $("ul > li:first-child a").next().show();
  $(".accordion > div").click(function(){
    $(this).next().toggle(300);
//     $(this).next().slideDown(300);
    return false;
  });
});