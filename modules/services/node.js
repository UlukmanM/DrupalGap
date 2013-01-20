drupalgap.services.node = {
	'create':{
		'options':{
			'type':'post',
			'path':'node.json',
			'success':function(node){
				drupalgap.node_edit = {};
				drupalgap.node = {'nid':node.nid};
			},
		},
		'call':function(options){
			try {
				var api_options = drupalgap_chain_callbacks(drupalgap.services.node.create.options, options);
				api_options.data = drupalgap_node_assemble_data(options);
				drupalgap.api.call(api_options);
			}
			catch (error) {
				navigator.notification.alert(
					error,
					function(){},
					'Node Create Error',
					'OK'
				);
			}
		},
	}, // <!-- create -->
	'retrieve':{
		'options':{
			'type':'get',
			'path':'node/%nid.json',
			'success':function(node){
				drupalgap.node = node;
				// TODO - a good opportunity for a hook to come in
				// and modify node.content if developer wants.
				node.content = '';
				if (node.body.length != 0) {
					node.content = node.body[node.language][0].safe_value;
				}
			},
		},
		'call':function(options){
			try {
				if (!options.nid) {
					navigator.notification.alert(
						'No node id provided!',
						function(){},
						'Node Retrieve Error',
						'OK'
					);
				  return;
				}
				var api_options = drupalgap_chain_callbacks(drupalgap.services.node.retrieve.options, options);
				api_options.path = 'node/' + options.nid + '.json';
				drupalgap.api.call(api_options);
			}
			catch (error) {
				navigator.notification.alert(
					error,
					function(){},
					'Node Retrieve Error',
					'OK'
				);
			}
		},
	}, // <!-- retrieve -->
	'update':{
		'options':{
			'type':'put',
			'path':'node/%nid.json',
			'success':function(node){
				drupalgap.node_edit = {};
				drupalgap.node = {'nid':node.nid};
			},
		},
		'call':function(options){
			try {
				var api_options = drupalgap_chain_callbacks(drupalgap.services.node.update.options, options);
				api_options.data = drupalgap_node_assemble_data(options);
				api_options.path = 'node/' + options.node.nid + '.json';
				drupalgap.api.call(api_options);
			}
			catch (error) {
				navigator.notification.alert(
					error,
					function(){},
					'Node Update Error',
					'OK'
				);
			}
		},
	}, // <!-- update -->
	'del':{
		'options':{
			'type':'delete',
			'path':'node/%nid.json',
			'success':function(result){
				if (result[0]) {
					drupalgap.node = {};
					drupalgap.node_edit = {};	
				}
				else {
					alert('node delete - error - ' + JSON.stringify(result));
				}
			},
		},
		'call':function(options){
			try {
				var api_options = drupalgap_chain_callbacks(drupalgap.services.node.del.options, options);
				api_options.path = 'node/' + options.nid + '.json';
				drupalgap.api.call(api_options);
			}
			catch (error) {
				navigator.notification.alert(
					error,
					function(){},
					'Node Delete Error',
					'OK'
				);
			}
		},
	}, // <!-- delete -->
};