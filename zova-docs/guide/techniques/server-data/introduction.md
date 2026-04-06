# Server Data

Zova provides different levels of abstraction for accessing server data, allowing us to obtain server data in various ways according to business needs, bringing a simple, intuitive, flexible, and powerful development experience

| Name        | Description                                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| $fetch      | A wrapper around axios                                                                                                                         |
| $api        | Provides business-oriented API services on top of $fetch                                                                                       |
| Model       | Uses Tanstack Query on top of $api to manage caching of remote data                                                                            |
| $sdk        | Provides a more general wrapper for remote APIs based on Model, offering a unified development experience                                      |
| Openapi SDK | Automatically generates front-end Client SDK based on Swagger/Openapi metadata                                                                 |
| $apiSchema  | Directly obtains API Schema metadata, which can be used to implement automatic Form rendering and data validation based on the Schema metadata |
