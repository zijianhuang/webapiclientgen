using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace DemoWebApi.Models
{
    // Models returned by AccountController actions.

    [Serializable]
    public class ExternalLoginViewModel
    {
        public string Name { get; set; }

        public string Url { get; set; }

        public string State { get; set; }
    }

    [Serializable]
    public class ManageInfoViewModel
    {
        public string LocalLoginProvider { get; set; }

        public string Email { get; set; }

        public IEnumerable<UserLoginInfoViewModel> Logins { get; set; }

        public IEnumerable<ExternalLoginViewModel> ExternalLoginProviders { get; set; }
    }

    [Serializable]
    public class UserInfoViewModel
    {
        public string Email { get; set; }

        public bool HasRegistered { get; set; }

        public string LoginProvider { get; set; }

        public string Dummy1;

        [NonSerialized]
        public string Dumy2;
    }

    [Serializable]
    public class UserLoginInfoViewModel
    {
        public string LoginProvider { get; set; }

        public string ProviderKey { get; set; }
    }

    /// <summary>
    /// Auth token
    /// </summary>
    [DataContract(Namespace = DemoWebApi.DemoData.Constants.DataNamespace)]
    public class TokenResponseModel
    {
        [DataMember(Name = "access_token")]
        public string AccessToken { get; set; }

        [DataMember(Name = "token_type")]
        public string TokenType { get; set; }

        [DataMember(Name = "expires_in")]
        public int ExpiresIn { get; set; }

        [DataMember(Name = "username")]
        public string Username { get; set; }

        [DataMember(Name = "issued")]
        public string Issued { get; set; }

        [DataMember(Name = "expires")]
        public string Expires { get; set; }
    }


}
