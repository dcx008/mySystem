Ext.namespace("Ext.ux.plugins");

Ext.ux.plugins.GroupHeaderGrid = function(config) {
	this.config = config;
};

Ext.extend(Ext.ux.plugins.GroupHeaderGrid, Ext.util.Observable,{
					init : function(grid) {
						Ext.applyIf(grid.colModel, this.config);
				        Ext.apply(grid.getView(), this.viewConfig);
				        
						var v = grid.getView();
						v.beforeMethod('initTemplates', this.initTemplates);
						v.renderHeaders = this.renderHeaders.createDelegate(v,
								[ v.renderHeaders ]);
						v.afterMethod('onColumnWidthUpdated',
								this.updateGroupStyles);
						v.afterMethod('onAllColumnWidthsUpdated',
								this.updateGroupStyles);
						v.afterMethod('onColumnHiddenUpdated',
								this.updateGroupStyles);
						v.getHeaderCell = this.getHeaderCell;
						v.updateSortIcon = this.updateSortIcon;
						v.getGroupStyle = this.getGroupStyle;
					},

					initTemplates : function() {
						var ts = this.templates || {};
						if (!ts.gheader) {
							ts.gheader = new Ext.Template(
									'<table border="0" cellspacing="0" cellpadding="0" class="ux-grid-group-table" style="{tstyle}table-layout: auto;">',
									'<thead>{rows}{header}</thead>', '</table>');
						}
						if (!ts.header) {
							ts.header = new Ext.Template(
									'<tr class="x-grid3-hd-row">{cells}</tr>');
						}
						if (!ts.gcell) {
							ts.gcell = new Ext.Template(
									'<td class="x-grid3-hd {cls} x-grid3-td-{id}" style="{style}" rowspan="{rowspan}" colspan="{colspan}">',
									'<div {tooltip} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">{value}</div>',
									'</td>');
						}
						this.templates = ts;
                        // this.constructor.prototype.initTemplates.apply(this, arguments);
                        // var ts = this.templates || {};
                        // if (!ts.gcell) {
                         //    ts.gcell = new Ext.XTemplate(
                         //        '<td class="x-grid3-hd {cls} x-grid3-td-{id} ux-grid-hd-group-row-{row}" style="{style}">',
                         //        '<div {tooltip} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',
                         //        '<tpl if="values.btn"><a class="x-grid3-hd-btn" href="#"></a></tpl>',
                         //        '{value}</div>',
                         //        '</td>'
                         //    );
                        // }
                        // this.templates = ts;
                        // this.hrowRe = new RegExp("ux-grid-hd-group-row-(\\d+)", "");
					},

					renderHeaders : function(renderHeaders) {
						var ts = this.templates, rows = [], table = [];
						for (var i = 0; i < this.cm.rows.length; i++) {
							var r = this.cm.rows[i], cells = [], col = 0;
							for (var j = 0; j < r.length; j++) {
								var c = r[j];
								c.colspan = c.colspan || 1;
								c.rowspan = c.rowspan || 1;
								while (table[i] && table[i][col]) {
									col++;
								}
								c.col = col;
								for (var rs = i; rs < i + c.rowspan; rs++) {
									if (!table[rs]) {
										table[rs] = [];
									}
									for (var cs = col; cs < col + c.colspan; cs++) {
										table[rs][cs] = true;
									}
								}
								var gs = this.getGroupStyle(c);
								cells[j] = ts.gcell
										.apply({
											id : c.id || i + '-' + col,
											cls : c.header ? 'ux-grid-hd-group-cell'
													: 'ux-grid-hd-nogroup-cell',
											style : 'width:'
													+ gs.width
													+ ';'
													+ (gs.hidden ? 'display:none;'
															: '')
													+ (c.align ? 'text-align:'
															+ c.align + ';'
															: ''),
											rowspan : c.rowspan,
											colspan : gs.colspan,
											tooltip : c.tooltip ? (Ext.QuickTips
													.isEnabled() ? 'ext:qtip'
													: 'title')
													+ '="' + c.tooltip + '"'
													: '',
											value : c.header || '&#160;',
											istyle : c.align == 'right' ? 'padding-right:16px'
													: ''
										});
							}
							rows[i] = ts.header.apply({
								cells : cells.join('')
							});
						}
						return ts.gheader.apply({
							tstyle : 'width:' + this.getTotalWidth() + ';',
							rows : rows.join(''),
							header : renderHeaders.call(this)
						});
						// var ts = this.templates, headers = [[],[]], cm = this.cm, rows = cm.rows, tstyle = 'width:' + this.getTotalWidth() + ';',tw = this.cm.getTotalWidth(), lw = this.cm.getTotalLockedWidth();
						// for (var row = 0, rlen = rows.length; row < rlen; row++) {
						// 	var r = rows[row], cells = [[],[]];
						// 	for (var i = 0, gcol = 0, len = r.length; i < len; i++) {
						// 		var group = r[i];
						// 		group.colspan = group.colspan || 1;
						// 		var l = cm.isLocked(gcol)?1:0;
						// 		var id = this.getColumnId(group.dataIndex ? cm.findColumnIndex(group.dataIndex) : gcol);
						// 		var gs = Ext.ux.plugins.GroupHeaderGrid.prototype.getGroupStyle2.call(this, group, gcol);
						// 		cells[l][i] = ts.gcell.apply({
						// 			cls: group.header ? 'ux-grid-hd-group-cell' : 'ux-grid-hd-nogroup-cell',
						// 			id: id,
						// 			row: row,
						// 			style: 'width:' + gs.width + ';' + (gs.hidden ? 'display:none;' : '') + (group.align ? 'text-align:' + group.align + ';' : ''),
						// 			tooltip: group.tooltip ? (Ext.QuickTips.isEnabled() ? 'ext:qtip' : 'title') + '="' + group.tooltip + '"' : '',
						// 			istyle: group.align == 'right' ? 'padding-right:16px' : '',
						// 			btn: this.grid.enableHdMenu && group.header,
						// 			value: group.header || '&nbsp;'
						// 		});
						// 		gcol += group.colspan;
						// 	}
						// 	headers[0][row] = ts.header.apply({
						// 		tstyle: 'width:' + (tw - lw) + 'px;',
						// 		cells: cells[0].join('')
						// 	});
						// 	headers[1][row] = ts.header.apply({
						// 		tstyle: 'width:' + lw + 'px;',
						// 		cells: cells[1].join('')
						// 	});

						// }
						// var h = this.constructor.prototype.renderHeaders.call(this);
						// headers[0][headers[0].length] = h[0];
						// headers[1][headers[1].length] = h[1];
						// return [headers[0].join(''),headers[1].join('')];
					},

					getGroupStyle : function(c) {
						var w = 0, h = true, cs = 0;
						for (var i = c.col; i < c.col + c.colspan; i++) {
							if (!this.cm.isHidden(i)) {
								var cw = this.cm.getColumnWidth(i);
								if (typeof cw == 'number') {
									w += cw;
								}
								h = false;
								cs++;
							}
						}
						return {
							width : (Ext.isBorderBox ? w : Math.max(w
									- this.borderWidth, 0))
									+ 'px',
							hidden : h,
							colspan : cs || 1
						}
					},
                getGroupStyle2: function(group, gcol) {
                    var width = 0, hidden = true;
                    for (var i = gcol, len = gcol + group.colspan; i < len; i++) {
                        if (!this.cm.isHidden(i)) {
                            var cw = this.cm.getColumnWidth(i);
                            if(typeof cw == 'number'){
                                width += cw;
                            }
                            hidden = false;
                        }
                    }
                    return {
                        width: (Ext.isBorderBox ? width : Math.max(width - this.borderWidth, 0)) + 'px',
                        hidden: hidden
                    };
                },

					updateGroupStyles : function(col) {
						var rows = this.mainHd.query('tr.x-grid3-hd-row');
						for (var i = 0; i < rows.length - 1; i++) {
							var cells = rows[i].childNodes;
							for (var j = 0; j < cells.length; j++) {
								var c = this.cm.rows[i][j];
								if ((typeof col != 'number')
										|| (col >= c.col && col < c.col
												+ c.colspan)) {
									var gs = this.getGroupStyle(c);
									cells[j].style.width = gs.width;
									cells[j].style.display = gs.hidden ? 'none'
											: '';
									cells[j].colSpan = gs.colspan;
								}
							}
						}
					},

					getHeaderCell : function(index) {
						return this.mainHd.query('td.x-grid3-cell')[index];
					},

					updateSortIcon : function(col, dir) {
						var sc = this.sortClasses;
						var hds = this.mainHd.select('td.x-grid3-cell')
								.removeClass(sc);
						hds.item(col).addClass(sc[dir == "DESC" ? 1 : 0]);
					}
});