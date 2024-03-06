import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserCheckoutValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    user_details: schema.object().members({
      name: schema.string(),
      place: schema.string()
    }),
    shipping_address: schema.object().members({
      address_1: schema.string(),
      address_2: schema.string(),
      zip_code: schema.number()
    })
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'order.user_details.name.required': 'Missing value of name',
    'order.user_details.place.required': 'Missing value of place',

    'order.shipping_address.address_1.required': 'Missing value for address_1',
    'order.shipping_address.address_2.required': 'Missing value for address_2',
    'order.shipping_address.zip_code.required': 'Missing value for zip_code'
  }
}
