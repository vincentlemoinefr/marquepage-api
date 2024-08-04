#!/bin/bash

# https://learn.microsoft.com/en-us/azure/application-gateway/self-signed-certificates
# https://superuser.com/questions/463081/adding-self-signed-certificate-to-trusted-root-certificate-store-using-command-l
# https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate

# You should use this script on git bash in Windows
# This environment variable avoid a bug with openssl in git bash on Windows
export MSYS_NO_PATHCONV=1

# CA conf
ca_file_name='self-root-ca'
ca_subject='/C=FR/ST=IDF/L=Paris/O=Marquepage/OU=IT/CN=Marquepage CA/emailAddress=vincent.lemoine.fr@gmail.com'

# Server conf
api_dns_name='localhost'
api_subject='/C=FR/ST=IDF/L=Paris/O=Marquepage/OU=IT/CN=localhost/emailAddress=vincent.lemoine.fr@gmail.com'

# Create a Root Certificate and self-sign it with the key
openssl ecparam -out $ca_file_name.key -name prime256v1 -genkey

openssl req -new -sha256 -key $ca_file_name.key -out $ca_file_name.csr -subj $ca_subject

openssl x509 -req -sha256 -days 3650 -in $ca_file_name.csr -signkey $ca_file_name.key -out $ca_file_name.crt

# Create a server certificate for localhost
openssl ecparam -out $api_dns_name.key -name prime256v1 -genkey

echo -n 'authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
extendedKeyUsage=serverAuth,clientAuth
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = localhost
DNS.2 = test.localhost
IP.1 = 127.0.0.1' > $api_dns_name.ext

openssl req -new -sha256 -key $api_dns_name.key -out $api_dns_name.csr -subj $api_subject

openssl x509 -req -sha256 -days 365 -in $api_dns_name.csr -extfile $api_dns_name.ext -CA $ca_file_name.crt -CAkey $ca_file_name.key -CAcreateserial -out $api_dns_name.crt

openssl verify -CAfile $ca_file_name.crt -verify_hostname $api_dns_name $api_dns_name.crt