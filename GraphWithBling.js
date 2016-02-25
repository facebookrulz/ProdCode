function calcCumuChg( timeSeries  , asc){
                cumuChg = 0.0;
                locArr = [];
		ctr1 = 0;
		console.log(' DOOGIE '+asc+' '+timeSeries.length);
                for (ctr = 0 ; ctr < timeSeries.length ; ctr++){
                        var singleObj = {};
                        singleObj['dt'] = new Date (timeSeries[ctr].dt);
                        singleObj['daily'] = timeSeries[ctr].daily;
                        singleObj['cumuChg'] = cumuChg;
                        cumuChg += timeSeries[ctr].daily;
                        locArr.push(singleObj);

                }
        return locArr;
 }

function initDragAndDt( bottomLCslider, bottomLCfrom, bottomLCto ) {
                        var begDate = new Date();
                        var endDate = new Date();
			bm_Data_ = tSDict[bnch];
		
                        $( bottomLCfrom ).datepicker(
                                                        { mindt: (tSDict[bnch])[0].dt,
                                                          maxdt: (tSDict[bnch])[ (tSDict[bnch]).length - 1 ].dt ,
                                                          beforeShowDay: $.datepicker.noWeekends ,
                                                          dateFormat: 'd M yy',
                                                          //constrainInput: true,
                                                          onClose: function(selecteddt) {
                                                          //need to pass via dt class since the selecteddt comes in as string
                                                          //*** whenever comparing or working with DATES lets stick to conversion into dt object***
                                                          if( null !== selecteddt){
                                                                        var locStore = _BM_MF_FromDt_idx;
                                                                        _BM_MF_FromDt_idx = findIndex( new Date(selecteddt) );
                                                                        //set the dragslider values to the ones selected by the dt
                                                                        if ( _BM_MF_FromDt_idx < _BM_MF_ToDt_idx) {
                                                                                $( bottomLCslider ).dragslider( "values" , [ _BM_MF_FromDt_idx , _BM_MF_ToDt_idx] )
                                                                                //now call the rescale function
										_drawBM_MF_axes ("#whlsLineChart", ".lastLine", tSDict, bnch , cmpAsset, "#dragslider-range", "#FromDt", "#ToDt" );
                                                                        }
                                                                        else{
                                                                                console.log("sorry from's always going to be lesser than TO!!");
                                                                                _BM_MF_FromDt_idx = locStore;
                                                                                $( bottomLCfrom ).datepicker({ dateFormat: 'd M yy' });
                                                                                $( bottomLCto ).datepicker( "setdt", new Date ( (dataTS[bnch])[_BM_MF_FromDt_idx].dt ) );
                                                                        }
                                                          }
                                                          }
                                                        }
                       );

                       $( bottomLCto ).datepicker(
							{ mindt: (tSDict[bnch])[0].dt,
                                                          maxdt: (tSDict[bnch])[ (tSDict[bnch]).length - 1 ].dt ,	
                                                          beforeShowDay: $.datepicker.noWeekends ,
                                                          dateFormat: 'd M yy',
                                                          //constrainInput: true,
                                                          onClose: function(selecteddt) {

                                                          if( null !== selecteddt){
                                                                   dateConst = (selecteddt.split("/"));
                                                                        var locStore = _BM_MF_ToDt_idx;
                                                                        //_BM_MF_ToDt_idx = findIndex( new Date( dateConst[1]+'/'+dateConst[0]+'/'+dateConst[2] ) );
                                                                        _BM_MF_ToDt_idx = findIndex( new Date(selecteddt) );
                                                                        //set the dragslider values to the ones selected by the dt
                                                                        //but also check if the end dt > start ...
                                                                        if ( _BM_MF_FromDt_idx < _BM_MF_ToDt_idx) {
                                                                                $( bottomLCslider ).dragslider( "values" , [ _BM_MF_FromDt_idx , _BM_MF_ToDt_idx] )
                                                                                //now call the rescale function
                                                                                _drawBM_MF_axes ("#whlsLineChart", ".lastLine", tSDict, bnch , cmpAsset, "#dragslider-range", "#FromDt", "#ToDt" );
                                                                        }else{
                                                                                console.log("sorry from's always going to be lesser than TO!!");
                                                                                _BM_MF_ToDt_idx = locStore;
                                                                                $( bottomLCfrom ).datepicker({ dateFormat: 'd M yy' });
                                                                                $( bottomLCto ).datepicker( "setdt", new Date ( (dataTS[bnch])[_BM_MF_ToDt_idx].dt ) );
                                                                        }
                                                                  }

                                                          }
                                                        }
                                                );

                $(bottomLCslider).width( DragSliderWidth );
                        $( bottomLCslider ).dragslider({
                          range: true,
                          min: 0,
                          rangeDrag: true,
                          max: tSDict[bnch].length-1,
                          //values: [ 0 , bm_Data_.length-2 ],
                          //the below is the call back function when the dragslider's moved
                          slide: function( event, ui ) {
                          //if the below is true then this is called when we click on the range rather
                                //than drag the handle
				bm_Data_ = tSDict[bnch];
                                if(!isDragging){
                                        begDate = bm_Data_[ui.values[ 0 ]].dt;
                                        endDate = bm_Data_[ui.values[ 1 ]-1].dt;

                                        _BM_MF_FromDt_idx = ui.values[ 0 ];
                                        _BM_MF_ToDt_idx = ui.values[ 1 ];
                                }
                                else
                                {
                                        console.log('NOW GONE BUST!!!');
                                }

                          },
                          change : function ( event, ui ){
                                console.log('HMM MOVING VIA THIS !!'+_BM_MF_FromDt_idx+' '+ui.values[ 0 ]);
                                //over ride if isDragging true

                          },
                          stop: function( event, ui ) {
                                //rather than call it every movement in the above call it once after user lets go of handle
                                //if()
                                if(!isDragging)
                                        {
						_drawBM_MF_axes ("#whlsLineChart", ".lastLine", tSDict, bnch , cmpAsset, "#dragslider-range", "#FromDt", "#ToDt" );
                                        }

                          }
                        });
                        $( bottomLCslider+" .ui-dragslider-range" ).unbind('mousedown');
                //first time init of Dates and alider
                $( bottomLCfrom ).datepicker({ dateFormat: 'd M yy' });
                $( bottomLCto ).datepicker({ dateFormat: 'd M yy' });
                $( bottomLCfrom ).datepicker( "setDate", new Date( bm_Data_[_BM_MF_FromDt_idx].dt ));
                $( bottomLCto ).datepicker( "setDate",  new Date(bm_Data_[_BM_MF_ToDt_idx].dt) );
                $( bottomLCslider ).dragslider( "values" , [ _BM_MF_FromDt_idx , _BM_MF_ToDt_idx] );
	}

	function findIndex(findDt){
		bm_Data_ = tSDict[bnch];
		alert(' grr  '+findDt);
                for(ctr = 0 ;ctr < bm_Data_.length; ctr++){
                        if( (new Date(bm_Data_[ctr].dt)).getTime() >= findDt.getTime() )
                                return ctr;
                }
                return -1;
        }



        var _sort_asc = function (date1, date2) {
  // This is a comparison function that will result in dates being sorted in
  // ASCENDING order. As you can see, JavaScript's native comparison operators
  // can be used to compare dates. This was news to me.
                if (date1 > date2) return 1;
                if (date1 < date2) return -1;
                return 0;
        }


function _drawBM_MF_axes(div, area, dataTS, bm, ass, slider, fromDt, toDt ) {
                        //both slices will have window prefix since we intend to use them outside this function
                        //defensive coding
			initDragAndDt( slider, fromDt, toDt );
			bm_Data_ = tSDict[bnch];
			var margin = {top: 20, right: 20, bottom: 20, left: 20},
	                width = parseFloat( $(div).css("width") ) - 2*margin.left - 2*margin.right,
        	        height = parseFloat( $(div).css("height") ) - margin.top - margin.bottom;

	                window.marOffsetX = margin.right;
	                window.marOffsetY = margin.top;

			window.bottomLCArea = area;
			window.bottomLCDiv = div;
			window.bottomLCslider = slider;
			window.bottomLCfrom = fromDt;
			window.bottomLCto = toDt;

  		        var xScaler = d3.time.scale()
                      		  .range([0, width]);

                	var yScaler = d3.scale.linear()
                        	.range([height, 0]);

                	var xAxis = d3.svg.axis()
                        	.scale(xScaler)
                        	.orient("bottom");

                	var yAxis = d3.svg.axis()
                        	.scale(yScaler)
                        	.orient("left");

               		 var svg = d3.select(area)
                        	.attr("width", width + margin.left + margin.right)
                       		.attr("height", height + margin.top + margin.bottom)
                        	.append("g")
                        	.attr("transform", "translate(" + margin.left + "," + (margin.top) + ")");
				
			d3.select(area).selectAll("path").remove();	
			d3.select(area).selectAll(".y.axis").remove();	
			d3.select(area).selectAll(".x.axis").remove();	
                        //clear existing


                        window.locBM =  ( dataTS[bm]  );
                        window.locCmp =  ( dataTS[ass] );

			var cutoff = 0;
//defensve coding to ensure both array sizes are same , just in case one time seres has more data
/*
			if ( locBM.length < locCmp.length ){
				locCmp = locCmp.slice( locCmp.length - locBM.length , locCmp.length );
			}else
				locBM = locBM.slice( locBM.length - locCmp.length , locBM.length );
*/
                        if(_BM_MF_FromDt_idx >= 0 && _BM_MF_ToDt_idx >= 0){
                                locBM = ( locBM.slice(_BM_MF_FromDt_idx  , _BM_MF_ToDt_idx ) );
                                locCmp = (  locCmp.slice( _BM_MF_FromDt_idx , _BM_MF_ToDt_idx ) );
                        }

			locBM = calcCumuChg( locBM , bm );
			locCmp = calcCumuChg( locCmp , ass);



                        var locDtList = [];
                        var locChg = [];
                        locChg.push( d3.min(locBM, function(d) { return d.cumuChg; }));
                        locChg.push( d3.max(locBM, function(d) { return d.cumuChg; }));
                        locChg.push( d3.min(locCmp , function(d) { return d.cumuChg; }));
                        locChg.push( d3.max(locCmp, function(d) { return d.cumuChg; }));
                        locChg = locChg.sort(_sort_asc);

                        locDtList.push( d3.min(locBM, function(d) { return d.dt; }));
                        locDtList.push( d3.max(locBM, function(d) { return d.dt; }));
                        locDtList.push( d3.min(locCmp , function(d) { return d.dt; }));
                        locDtList.push( d3.max(locCmp, function(d) { return d.dt; }));
                        locDtList = locDtList.sort(_sort_asc);

                        window.mindt = locDtList[0];
                        window.maxdt = locDtList[locDtList.length-1];
                        window.minClose = locChg[0];
                        window.maxClose = locChg[locChg.length-1];

                        console.log('date '+mindt+' '+maxdt+' '+minClose+' '+maxClose+' '+locBM.length+' '+locCmp.length);

                        var line = d3.svg.line()
                                                .x(function(d) { return xScaler(d.dt); })
                                                .y(function(d) { return yScaler(d.cumuChg); });

                        xScaler.domain([mindt, maxdt]);
                        yScaler.domain([minClose, maxClose]);

                        //dt picker - set min and max dts for the calendar to show
                        // also setup call back function for dt closing ..if that happens
                        // then you need call this _reScaleBM_MF_axes after resetting start and end index
                        



                    svg.select(".y.axis").transition().duration(500).ease("sin-in-out")  // https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_ease
                    .call(yAxis);
                    svg.select(".x.axis").transition().duration(500).ease("sin-in-out")  // https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_ease
                    .call(xAxis);


		svg.append("g")
                          .attr("class", "x axis")
                          .attr("transform", "translate(0," + height + ")")
                          .call(xAxis);

                svg.append("g")
                          .attr("class", "y axis")
                          .call(yAxis)
                          .append("text")
                          .attr("transform", "rotate(-90)")
                          .attr("y", 2)
                          .attr("dy", "1em")


                        //add benchmark
                window.benchMarkPath =  svg.append("path")
                          .datum(locBM)
                          .attr("class", "line")
                          .attr("id", bm)
                          .attr("d", line)
                          .attr("stroke", assetColor)
                          .attr("transform", "translate(0,0)");

                window.NiftyPath =      svg.append("path")
                          .datum(locCmp)
                          .attr("class", "line")
                          .attr("id", ass)
                          .attr("d", line)
                          .attr("stroke", cmpassetColor)
                          .attr("transform", "translate(0,0)");

		if ( _BM_MF_FromDt_idx < _BM_MF_ToDt_idx) {
		
                $( bottomLCfrom ).datepicker({ dateFormat: 'd M yy' });
                $( bottomLCfrom ).datepicker({ onClose: function(selecteddt) { alert( selecteddt );  } });
                $( bottomLCto ).datepicker({ dateFormat: 'd M yy' });
                $( bottomLCfrom ).datepicker( "setDate",  new Date (bm_Data_[_BM_MF_FromDt_idx].dt) );
                $( bottomLCto ).datepicker( "setDate",  new Date (bm_Data_[_BM_MF_ToDt_idx].dt) );
                $( bottomLCslider ).dragslider( "values" , [ _BM_MF_FromDt_idx , _BM_MF_ToDt_idx] );
                }
                        else{
                                //better error handling ..for now just console.log
                                console.log("sorry from dt's always going to be earlier than To Date ..never went to school ..sucker ?");
                        }


                        //console();

}


