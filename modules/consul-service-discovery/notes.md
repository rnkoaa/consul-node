# Notes

## Register service via http

```sh
curl http://localhost:8500/v1/catalog/service/web
[
    {
        "Node":"Armons-MacBook-Air",
        "Address":"172.20.20.11",
        "ServiceID":"web", 
        "ServiceName":"web",
        "ServiceTags":["rails"],
        "ServicePort":80
    }
]
```