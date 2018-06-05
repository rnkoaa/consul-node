# Using Bitsrc components inside this project

1.import the necessary components from bit

```sh
$ bit import rnkoaa.consul/cloud/consul-config -p src/components/consul-config --skip-npm-install
```
```sh
$ bit import rnkoaa.consul/cloud/consul-service-discovery -p src/components/consul-service-discovery --skip-npm-install
```

2. Copy the dependencies from the components into your `package.json` file.

3. Run `npm install` to update any dependencies from the components

4. Enjoy the components.
