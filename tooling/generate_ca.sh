#!/bin/bash

# https://learn.microsoft.com/en-us/azure/application-gateway/self-signed-certificates
# https://superuser.com/questions/463081/adding-self-signed-certificate-to-trusted-root-certificate-store-using-command-l
# https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate

# You should use this script on git bash in Windows
# This environment variable avoid a bug with openssl in git bash on Windows
export MSYS_NO_PATHCONV=1

# Create a Root Certificate and self-sign it with the key
ca_file_name="self-root-ca"

ca_country="C=FR"
ca_state="ST=IDF"
ca_city="L=Paris"
ca_organization="O=Marquepage"
ca_operation_unit="OU=IT"
ca_common_name="CN=Marquepage CA"
ca_email="emailAddress=vincent.lemoine.fr@gmail.com"

ca_subject="/$ca_country/$ca_state/$ca_city/$ca_organization/$ca_operation_unit/$ca_common_name/$ca_email"

openssl ecparam -out $ca_file_name.key -name prime256v1 -genkey

openssl req -new -sha256 -key $ca_file_name.key -out $ca_file_name.csr -subj $ca_subject

openssl x509 -req -sha256 -days 3650 -in $ca_file_name.csr -signkey $ca_file_name.key -out $ca_file_name.crt

# Create a server certificate for localhost
crt_name="localhost"

crt_country="C=FR"
crt_state="ST=IDF"
crt_city="L=Paris"
crt_organization="O=Marquepage"
crt_operation_unit="OU=IT"
crt_common_name="CN=localhost"
crt_email="emailAddress=vincent.lemoine.fr@gmail.com"

crt_subject="/$crt_country/$crt_state/$crt_city/$crt_organization/$crt_operation_unit/$crt_common_name/$crt_email"

openssl ecparam -out $crt_name.key -name prime256v1 -genkey

echo -n "authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
extendedKeyUsage=serverAuth,clientAuth
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = localhost
DNS.2 = test.localhost
IP.1 = 127.0.0.1" > $crt_name.ext

openssl req -new -sha256 -key $crt_name.key -out $crt_name.csr -subj $crt_subject

openssl x509 -req -sha256 -days 365 -in $crt_name.csr -extfile $crt_name.ext -CA $ca_file_name.crt -CAkey $ca_file_name.key -CAcreateserial -out $crt_name.crt

openssl verify -CAfile $ca_file_name.crt -verify_hostname $crt_name $crt_name.crt