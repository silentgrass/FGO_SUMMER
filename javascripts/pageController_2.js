function initPage(){
  
  $("input[name='rarity']").bind("change" , function(){
    var rareValue = "";
    $("input[name='rarity']:checked").each(function(){
       rareValue += $(this).val();
    });
    
    $("#rarityCheck").val(rareValue);
  });
}

function filterRun(){

  clearResult();
  
  var rareCheck = $("#rarityCheck").val();
  var classCheck = $("#classSelector").val();
  var itemCheck = $("#itemSelector").val();

  for (var i = 0; i < servantData.length ; i++){
    
    if ( !(servantData[i].class == classCheck || classCheck == "all") ){
      continue;
    }
    
    if ( !(rareCheck.indexOf(servantData[i].rarity) > -1) ){
      continue;
    }
    
    if ( !(itemCheck == servantData[i].item) ){
      continue;
    }

    putResult(servantData[i]);

  }

  resultSetup();
}

function putResult(servant){
  $("."+servant.rarity).children("."+servant.class).append("<input type='checkBox' name='partyChecker' svName='"+servant.name+"' item='"+servant.item+"'value="+servant.cost+">")
  $("."+servant.rarity).children("."+servant.class).append("<span>"+servant.name+"</span><br/>")
}

function clearResult(){
  $(".saber, .archer, .lancer, .rider, .assassin, .caster, .berserker, .ex").html("");
}

function resultSetup(){

  $("input[name='partyChecker']").bind("change" , function(){
       
    
    if ($(this).prop("checked") == true){

      if ($(".party").length > 4 ){
        alert("組隊最大五人");
        $(this).prop("checked", false);
        return false;
      }
       
      if ($("input[name='"+$(this).attr("svName")+"']").length != 0) {
        return false;
      }
        
      joinUnit($(this));     
      
    }else{
      if ($(".party").length == 0){
        return false;
      }else{
        $("input[name='"+$(this).attr("svName")+"']").click();
      }
    }
  });
}


function joinUnit(obj){
  var copySelector = $("#craftSelector").clone();
  copySelector.removeClass("hidden");
  
  $(copySelector).bind("change" , caculator);

  $("#partyList").append("<li class='party' cost='"+$(obj).attr('value')+"'></li>");
  $("#partyList").children().last().append("<span class='"+$(obj).attr('item')+"'>"+$(obj).attr('svName')+" "+$(obj).attr('item')+"</span>&nbsp;");
  $("#partyList").children().last().append(copySelector);
  $("#partyList").children().last().append("&nbsp;<input type='button' name='"+$(obj).attr('svName')+"' value='離隊' onclick='removeUnit(this);'>");

  caculator();
}

function removeUnit(obj){  
  var objName = $(obj).attr("name");
  
  if ($("input[svName='"+objName+"']").prop("checked") == true){
    $("input[svName='"+objName+"']").prop("checked" , false);
  }

  $(obj).parent().remove();
  caculator();
}

function caculator(){
  var lightSum = 0;
  var cementSum  = 0;
  var realtaSum = 0;
  var eadromSum  = 0;
  var oilSum  = 0;
  var cost = 0;

  $(".party").each(function(){
    if ($(this).children("span").first().hasClass("light")){
      lightSum += 1;
    }else if ($(this).children("span").first().hasClass("eadrom")){
      eadromSum += 1;    
    }else if ($(this).children("span").first().hasClass("oil")){
      oilSum += 1;
    }else if ($(this).children("span").first().hasClass("realta")){
      realtaSum += 1;
    }else if ($(this).children("span").first().hasClass("cement")){
      cementSum += 1;
    } 
    
    cost += parseInt($(this).attr("cost"));
  });
   
  $(".craft").each(function(){
    if ($(this).children(":selected").attr("item") == "cement"){
      cementSum += 1;
    }else if($(this).children(":selected").attr("item") == "oil"){
      oilSum += 1;
    }else if($(this).children(":selected").attr("item") == "realta"){
      realtaSum += 1;
	}else if($(this).children(":selected").attr("item") == "light"){
      lightSum += 1;
	}else if($(this).children(":selected").attr("item") == "eadrom"){
      eadromSum += 1;
    }else if($(this).children(":selected").attr("item") == "lighteadromrealta"){
      lightSum += 1;
      eadromSum += 1;
	  realtaSum +=1;
    }

    cost += parseInt($(this).val());
  });
  $("#cost").html(cost);
  $("#realta").html(realtaSum);
  $("#oil").html(oilSum);
  $("#eadrom").html(eadromSum);
  $("#cement").html(cementSum);
  $("#light").html(lightSum);
}