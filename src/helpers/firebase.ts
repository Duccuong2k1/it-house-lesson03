import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import config from "config";

function initFirebaseApp() {
  // const serviceAccount = config.get<ServiceAccount>("firebase.serviceAccount");
  const serviceAccount = {
    type: "service_account",
    project_id: "ithouse-65fb9",
    private_key_id: "bfd6306334fae734f5cd476bb335f2867ad1665c",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCDo5a2dTwQQVUo\noJU/C00qBihaoAxMftp5QVP2WgPYxxvzCAUKuyC4je8umNVX0oq0DoH7/7qU/9Dg\nQAQt9GtwswI8Lq0QOWXM7cfCInEVkLg1CvQwwmuFEsEj003xeqzup6HprRPmsYUn\nek1MvHgYeA2fPW/H9mgkKvOx9RbOam5S7U5zIgsEDrXY6VuYg0Mg7v56s2LWBeQr\npMhMGStN+aOiJg2Bbtwgd3MOlYG3bY+EseQ6sYfml2vKVPh7wj43h0GtjlovFBF4\nVeqqXyFQXFhbAwrFwEoWtA4zGYFWFx+uFgwpa/zrkZF/cZ8sW+5bbi19xikb+TYQ\nBcfyTJbjAgMBAAECggEAGxaYtucc+wNWsMuKqrR6poEp4Kw6m6sm7fjBfFo9nGgs\nmjA2SWUEcLXUWDRfAnlyzWaG3QJctLiHlP3XXlWDnmdXuGaqekI1bpwnlQ1dU+C5\n50Bfy4DWe0XGtMaQrXZfC6U3LkzNYZV6HwuNyJKn6/EYbIJJ9E4CVB76ks4qaUM1\n7YJ/CSvQvXArwp5U7d+P6UcGfTA7QK8v+aDJG/XLFaMR0UVKTaaxT2x6Y62GA+Cr\nrKxsqWGX0DwpiUyiVPSMW7pPZA8wV063r4go77v/AqFDxDcyZdtsvRQztVhA39x8\nc6JVOeIORcMVNVnfRWjV4JMnDGfF7jxgCZi/DNbyUQKBgQC6G80birEsUkKO2k6l\nd+1h4fD2Sxqst2l4O47EhaxR2UMCweKISaNI+dJmE79mtos18Cr4Hp40ebbch5hr\n+eWT8VBq6RaItst5XQEBYl1JMVQFeft7oxMwD3oeb7EmzmE12AaB4Sk3N6+KnP7S\nHseIC4r0D+k8Is4ypZ9qymmbxwKBgQC1EyoiqkaKT9Rn8C0AFG1f/wp9MN+pARDP\nixV4H+RrmFwhJ4DrGVQA+3txvJzlyZf8AhfPfM5lbJLsx4kwVdfuuHBpOwXNBLwt\n/TCu9/VqWgZ+b2GQLbCB2o+va7VhjTCSx4sGYwCFFtUtG31hqbDjHXzz9gdnCBUj\n4GGRZ2cUBQKBgBqF88lFDtL+NjYdrq+uU8prZOf09CxBR2q3MjWXx2Myz3YJI7vA\nouC3meCqV9DPmy9otvb9hhZ8ci8js/lPeASJk6ho56k8Q+tb8dS8rAbOXOca51hL\neWSUEBdeW6ToLLp7uxGvgSw5Z28dyMMxV8ZvvrHhwp+rZi+ZowqZJkvpAoGAbhNY\nafpZJ3ugBA9dS88fLlw8ZB5x2KttLL3AL2Yz1bSpTP5WwJSFHJPEVz/xoT8LxYcA\nMoIMdluqdYZXP6rvuY8lxtK6lAds3ggssDDMX/qaOAI9rQgZZNcYwesYOFU8Uf47\n5YYJqt5WeTVc4yHlBivG6geGOHwRXd3pchsJ7oECgYEAhzsPUBvzJwe79eFJOBjx\nOqRFReO54h5yD67EYNWuOoG2VRPmCuDiBxTDJMM5LQmBHpz+sttLx1kYDg4DNzr4\nfM2b0SoTE914mvvYJXOphGrSHwJdSP+u7DdaXcI4ZSQEQXT6VsSTYx9iobqmOsi7\npBOgfOGaemYlGU8V0AEitr8=\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-i7xsc@ithouse-65fb9.iam.gserviceaccount.com",
    client_id: "106105926524918260209",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-i7xsc%40ithouse-65fb9.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
    appId: "1:33587464908:web:5243319c32913d25a79069",
  };
  const cert = admin.credential.cert(serviceAccount as ServiceAccount);
  const firebase = admin.initializeApp({ credential: cert });

  return firebase;
}

export default initFirebaseApp();
