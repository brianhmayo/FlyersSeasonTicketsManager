angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function(mvToastr) {
    return {
        notifySuccess: function(msg) {
            mvToastr.success(msg);
            console.log(msg);
        },
        notifyFailure: function(msg) {
            mvToastr.error(msg);
            console.log(msg);
        }
    }}
);