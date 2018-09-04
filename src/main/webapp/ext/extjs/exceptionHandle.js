//处理服务器返回失败
failureHandle=function(){
	parent.Ext.Msg.show({
	   title:'错误',
	   msg: '网络请求异常，请检查网络是否正常！',
	   buttons: Ext.Msg.OK,
	   width:240,
	   minWidth:240,
	   closable:false,
	   icon: Ext.MessageBox.ERROR
	});
	Ext.TaskMgr.stopAll();
};



//一般调用后台执行异常
execExceptionHandle=function(response){
	var tag = false;
	try{
		var respText = Ext.util.JSON.decode(response.responseText);
		
		if(respText.success==false){
			
			createErrorInfoWindow(respText.actionErrors).show();
			
			tag = true;
		}
	}catch(e){
		if(response.status==200){
			top.window.location.href = "login.htm";
		}else{
			createErrorInfo2Window(response.responseText).show();
		}
	}
	return tag;
};

//处理使用Ext.lib.Ajax.conn载入时异常
connEcxeptionHandle=function(respText){
	var tag = false;
	
	if(respText.success==false){
		
		createErrorInfoWindow(respText.actionErrors).show();
		
		tag = true;
	}
	
	return tag;
};

//submit调用后台执行异常
subExecExceptionHandle=function(form, action){
	
	response = action.response;
	
	var tag = false;
	
	var respText = Ext.util.JSON.decode(response.responseText);
	
	if(respText.success==false){
		
		createErrorInfoWindow(respText.actionErrors).show();
		
		tag = true;
	}
	
	return tag;
};





isException=function(resp,opts){
	var tag = false;
	
	var respText = Ext.util.JSON.decode(resp.responseText); 
	
	if(respText.success==false){
		parent.Ext.Msg.show({
		   title:'错误',
		   msg: respText.actionErrors,
		   buttons: Ext.Msg.OK,
		   minWidth:240,
		   closable:false,
		   icon: Ext.MessageBox.ERROR
		});
		tag = true;
	}
	
	return tag;
};




createErrorInfoWindow=function(actionErrors){
	
	var sn = new Date();
	
	var errorWindow = new parent.Ext.Window({
		title:'异常',
		width: 500,
		height:'auto',
		bodyStyle:'padding:5px;',
	    maskDisabled:false,
	    maximizable:true,
	    modal:true,
		buttonAlign:'center',
		html:"<h3 align='center'>"+actionErrors[0]+"</h3><div id='errorDetailDIV_"+sn+"' style='height:150;overflow-x:hidden;overflow-y:scroll;display:none'>"+actionErrors[1]+"</div>",
		buttons:[
			{
				id:'showErrorInfo_'+sn,
				text:'显示错误详细信息',
				handler:function(){
							this.hide();
							parent.Ext.getCmp('hiddenErrorInfo_'+sn).show();
							parent.Ext.getDom('errorDetailDIV_'+sn).style.display='';
						}
			},
			{
				id:'hiddenErrorInfo_'+sn,
				hidden:true,
				text:'隐藏错误详细信息',
				handler:function(){
							this.hide();
							parent.Ext.getCmp('showErrorInfo_'+sn).show();
							parent.Ext.getDom('errorDetailDIV_'+sn).style.display='none';
						}
			},
			{
				text:'取消',
				handler:function(){
					errorWindow.close();
				}
			}
		]
	}).show();
	
	return errorWindow;
};

createErrorInfo2Window=function(actionErrors){
	
	var sn = new Date();
	
	var errorWindow = new parent.Ext.Window({
		title:'异常',
		width: 500,
		height:'auto',
		bodyStyle:'padding:5px;',
	    maskDisabled:false,
	    maximizable:true,
	    modal:true,
		buttonAlign:'center',
		html:"<h3 align='center'>后台发生错误</h3><div id='errorDetailDIV_"+sn+"' style='height:150;overflow-x:hidden;overflow-y:scroll;display:none'>"+actionErrors+"</div>",
		buttons:[
			{
				id:'showErrorInfo_'+sn,
				text:'显示错误详细信息',
				handler:function(){
							this.hide();
							parent.Ext.getCmp('hiddenErrorInfo_'+sn).show();
							parent.Ext.getDom('errorDetailDIV_'+sn).style.display='';
						}
			},
			{
				id:'hiddenErrorInfo_'+sn,
				hidden:true,
				text:'隐藏错误详细信息',
				handler:function(){
							this.hide();
							parent.Ext.getCmp('showErrorInfo_'+sn).show();
							parent.Ext.getDom('errorDetailDIV_'+sn).style.display='none';
						}
			},
			{
				text:'取消',
				handler:function(){
					errorWindow.close();
				}
			}
		]
	}).show();
	
	return errorWindow;
};



