var connection = new require('./kafka/connection');
require('./db/Mongo')
const companyAPI = require('./APIS/employer')
const jobSeeker = require("./APIS/jobSeeker")
const searchAPI = require("./APIS/searchAPI");


function handleTopicRequest(topic_name, fname) {
  console.log("Inside Kfka2");
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("Kafka Server is running ");
  consumer.on("message", function (message) {
    console.log("Message received for " + topic_name);
    var data = JSON.parse(message.value);
    fname.handle_request(data.data, function (err, res) {
      console.log("error", err);
      console.log("res", res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      console.log(payloads);
      producer.send(payloads, function (err, data) {
        console.log("error2", err);
        console.log(data);
      });
    });
  });
}

handleTopicRequest("companytopic", companyAPI);
handleTopicRequest("jobSeeker-topic", jobSeeker);
handleTopicRequest("search-topic", searchAPI);
