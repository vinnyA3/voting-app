angular.module('pollsCtrl', ['pollsService'])
    .controller('pollsController', function($location,$routeParams, Poll){
        
        var vm = this;
    
        //set the error variable
        vm.error = false;
        vm.processing = true;
    
        vm.getpolls = function(){
            Poll.getPolls()
                //on success
                .then(function(data){
                    //set the poll object with the data
                    vm.processing = false;
                    console.log(data);
                    vm.polls = data;
                })
                // on error
                .catch(function(data){
                    vm.processing = false;
                    //set the error
                    vm.error = true;
                    vm.errorMessage = "Failed to retrieve polls. Please try again later.";
                    
                });
        }; //end get polls
    
        //delete poll
        vm.deletePoll = function(id){
            
          Poll.deletePoll(id)
            //on success
            .then(function(data){
            
              //after delete, get the new update polls list
              Poll.getPolls()
                //on success
                .then(function(data){
                    //set the poll object with the data
                    console.log(data);
                    vm.polls = data;
                })
                
            });    
          
        };
        
        //function for implementing the chart
        vm.chartData = function(poll){
            //initialize our label array and our data array(which will contain the votes for the options)
            var label = [], data = [];
            
            //Now grab the labels and data to be used in the chart; in this case(obj.option value && obj.votes value)
            poll.options.forEach(function(obj){
               label.push(obj.option); 
               data.push(obj.votes);
            });
            
            //create our data object to be sent to my New Chart
            var data = {
              labels: label,
              datasets: [
                  {
                        label: "My First dataset",
                        fillColor: "rgba(64,186,57,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: data
                  }
              ]
            };
             
            //initialize chart variables
            var ctx = document.getElementById("myChart").getContext("2d");
            var myBarChart = new Chart(ctx).Bar(data);   
        };
    
    
    
        vm.getPollInfo = function(){
            
            Poll.getPoll($routeParams.poll_id)
                //on success
                .then(function(data){
                    console.log(data);
                    vm.singlePoll = data;
                    //pass the data, poll, into our chartData function
                    vm.chartData(data);
                })
                //error
                .catch(function(){
                    console.log("error getting data...");
                });
        };
    
        //vote function
        vm.vote = function(){
            Poll.incrementVote($routeParams.poll_id, vm.voteOption)
                //on success
                .then(function(data){
                    //get the newly updated poll, and change the ouputted poll's data
                    vm.singlePoll = data;
                    //pass the data, poll, into our chartData function
                    vm.chartData(data);
                    //disable var for single poll view
                    vm.voteDisable = true;
                })
                //error
                .catch(function(){
                    console.log('error updating data!');
                });
        };
        
    
    });