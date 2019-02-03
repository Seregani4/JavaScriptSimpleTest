/**
 * Created by Cottomoeller on 4/20/2016.
 */
var kafkaConsumersPage = function(){

    this.kafkaConsumerList = element.all(by.className('kafka-consumer-cluster-list')).get(0);

};

module.exports = new kafkaConsumersPage();