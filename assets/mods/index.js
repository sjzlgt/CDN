/**
 @Name: 首页
 */
layui.define(['layer'], function(exports){
  var $ = layui.jquery
  ,layer = layui.layer
  ,device = layui.device();
  
  //阻止IE7以下访问
  if(device.ie && device.ie < 8){
    layer.alert('如果您非得使用 IE 浏览器访问Fly社区，那么请使用 IE8+');
  }

  var INDEX={};

  INDEX.initCategory=function(){
    $.ajax({
      url: "/index/getNavigatio",
      type: 'GET',
      dataType: "json",
      success: function (res, status, xhr) {
        if (res.length > 0){
          var categoryHTML = '';
          res.forEach(category=>{
            categoryHTML += '<li><a href="#category_title_box_'+category.id+'">'+category.categoryName+'</a></li>';
          });
          $('#ulNavigationBox').html(categoryHTML);
        }
      }
    });
  };
  INDEX.initWebsite=function(){
    $.ajax({
      url: "/index/getWebsite",
      type: 'GET',
      dataType: "json",
      success: function (res, status, xhr) {
        if (res.length > 0){
          var websiteHTML = '';
          res.forEach(category=>{
            websiteHTML += '<div class="fly-panel" id="category_title_box_'+category.categoryId+'" style="margin-bottom: 15px;">';
            websiteHTML += '<div class="fly-panel-title fly-filter">';
            //websiteHTML += '<a href="" class="layui-this"><strong>'+category.categoryName+'</strong></a>';
            websiteHTML += '<strong>'+category.categoryName+'</strong>';
            websiteHTML += '</div>';
            websiteHTML += '<ul class="fly-case-list">';
            var websiteInfoList = category.websiteList;
            if (websiteInfoList.length > 0){
              websiteInfoList.forEach(website=>{
                websiteHTML += '<li data-id="'+ website.id +'">';
                //websiteHTML += '<a class="fly-case-img" href="'+ website.url +'" target="_blank" >';
                //websiteHTML += '<img src="'+ website.logo +'" alt="'+ website.name +'">';
                //websiteHTML += '</a>';
                websiteHTML += '<div style="width:100%; text-align:center; height: 70px;">';
                websiteHTML += '<a href="'+ website.url +'" target="_blank" >';
                websiteHTML += '<img src="'+ website.logo +'" alt="'+ website.name +'" style=" max-width: 98%; height:60px;">';
                websiteHTML += '</a>';
                websiteHTML += '</div>';
                websiteHTML += '<p class="fly-case-desc">'+ website.websiteRemark +'</p>';
                //websiteHTML += '<div class="layui-btn-container fly-case-btn-info">';
                //websiteHTML += '<button class="layui-btn layui-btn layui-btn-xs fly-case-active" data-type="praise">点赞</button>';
                //websiteHTML += '</div>';
                websiteHTML += '</li>';
              });
            }
            websiteHTML += '</ul></div>';
          });
          $('#divWebsiteBox').html(websiteHTML);
        }
      }
    });
  };

  INDEX.initCategory();
  INDEX.initWebsite();
});

