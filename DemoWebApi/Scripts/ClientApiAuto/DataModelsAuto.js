var DemoWebApi;
(function (DemoWebApi) {
    var DemoData;
    (function (DemoData) {
        var Client;
        (function (Client) {
            (function (AddressType) {
                AddressType[AddressType["Postal"] = 0] = "Postal";
                AddressType[AddressType["Residential"] = 1] = "Residential";
            })(Client.AddressType || (Client.AddressType = {}));
            var AddressType = Client.AddressType;
            (function (Days) {
                Days[Days["Sat"] = 1] = "Sat";
                Days[Days["Sun"] = 2] = "Sun";
                Days[Days["Mon"] = 3] = "Mon";
                Days[Days["Tue"] = 4] = "Tue";
                Days[Days["Wed"] = 5] = "Wed";
                Days[Days["Thu"] = 6] = "Thu";
                Days[Days["Fri"] = 7] = "Fri";
            })(Client.Days || (Client.Days = {}));
            var Days = Client.Days;
        })(Client = DemoData.Client || (DemoData.Client = {}));
    })(DemoData = DemoWebApi.DemoData || (DemoWebApi.DemoData = {}));
})(DemoWebApi || (DemoWebApi = {}));
//# sourceMappingURL=DataModelsAuto.js.map