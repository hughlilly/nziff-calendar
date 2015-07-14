// console.log("script injected");

var generateICS = function() {
  nziffWishlist = angular.element('body').injector().get("Wishlist");

  var timeOffset = function () {
    return -(new Date().getTimezoneOffset() / 60);
  }

  var convertDate = function(day, time) {
    var date = day.substr(0, 4) + "-" + day.substr(4);
    date = date.substr(0, 7) + "-" + date.substr(7);
    date = moment(date);
    return moment(date.valueOf() + time*1000).toDate().toUTCString();
  };

  var cal = ics();
  angular.forEach(nziffWishlist.getSessions(), function (session) {
    console.log(session);
    var location = $("#wishlist-session-" + session.id.split(":").pop()).find("[itemprop='location']").text();

    var startDate = convertDate(session.day, session.startTime);
    var endDate = convertDate(session.day, session.endTime);

    cal.addEvent(session.title, session.title, location, startDate.toString(), endDate.toString());
  });
  cal.download("nziff");
};


$(".mynziff-wishlist-article nav.social-nav").append("<a class=\"btn btn-regular btn-buy btn-ics btn-block doubleclick\"><span class=\"label\">Download Sched.</span></a>")
$(".mynziff-wishlist-article nav.social-nav").on("click", ".btn-ics", function(event) {
  event.preventDefault();
  generateICS();
  return false;
});
