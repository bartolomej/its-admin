export default class DomainError extends Error {

  constructor (name, message, description) {
    super(message);
    this.name = name;
    this.description = description;
  }

}