var app = angular.module("ritishResume", [])
app.config([
    '$httpProvider',
    function ($httpProvider) {
        console.log($httpProvider);
        delete $httpProvider.defaults.headers.post['Content-Type']; //Fixes cross domain requests
    }
]);
app.controller("myCtrl", function ($scope, $http, $location, $window) {

    $scope.openEmail = function () {
        mixpanel.track('Opened Email Modal')
        $('#modal1').openModal();
    };
    $http({
        method: 'get',
        url: 'https://flowxo.com/hooks/a/58367wez'
    })

    $scope.sendMail = function () {
        mixpanel.track('Clicked Send Email')
        $http({
            method: 'post',
            url: '/mail',
            data: {
                'email': $scope.senderEmail,
                'name': $scope.senderName,
                'phone': $scope.senderTelephone,
                'message': $scope.senderMessage
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            $('#modal1').closeModal();
            mixpanel.register({
                'email': $scope.senderEmail,
                'name': $scope.senderName,
                'phone': $scope.senderTelephone
            });
            $scope.icon = 'email';
            $scope.content = 'Thank You for your message! '
            $scope.class = 'snack'
            setTimeout(() => {
                $scope.$apply(function () {
                    $scope.class = "";
                });

            }, 4000)

            Materialize.toast(' Thank You for your message! ', 4000)

            var obj = new CB.CloudObject('Records');
            obj.set('name', $scope.senderName);
            obj.set('message', $scope.senderMessage);
            obj.set('phone', $scope.senderTelephone);
            obj.set('email', $scope.senderEmail)

            obj.save({
                success: function (obj) {},
                error: function (error) {}
            });

        }, (err) => {
            $('#modal1').closeModal();
            $scope.icon = 'email';
            $scope.content = 'Some error occurerd! '
            $scope.class = 'snack'
            setTimeout(() => {
                $scope.$apply(function () {
                    $scope.class = "";
                });

            }, 4000)

            Materialize.toast(' Some error occurerd! ', 4000)
        });
    };
    $scope.openMap = function () {
        mixpanel.track('Opened Map')
        $('#mapModal').openModal();

    }
    $scope.inputTextChange = function () {
        var obj = new CB.CloudObject('SearchText');
        obj.set('text', $scope.searchText);

        obj.save({
            success: function (obj) {},
            error: function (error) {}
        });
        if ($scope.searchText.toLowerCase() === 'email')
            $('#modal1').openModal();

    }
    $scope.query = function (x) {
        if (x == 1) {
            mixpanel.track('Clicked About')
            $scope.searchText = 'about';
        } else if (x == 2) {
            mixpanel.track('Clicked Work')
            $scope.searchText = 'work';
        } else if (x == 3) {
            mixpanel.track('Clicked Experience')
            $scope.searchText = 'experience';
        } else if (x == 4) {
            mixpanel.track('Clicked Skills')
            $scope.searchText = 'skills';
        } else if (x == 5) {
            mixpanel.track('Clicked Resume')
            $scope.searchText = 'resume';
        }
    }
    var id = $location.$$search.id
    console.log(id);
    $scope.track = function (event) {
        mixpanel.track(event)
    }
    $scope.load = function () {
        $scope.searchText = '';
        $scope.searchText.length = 0;
        CB.CloudApp.init('idxnuammqhst', 'a3cfe7dd-6f85-42b7-b366-013d89f59b5d');
    };

});