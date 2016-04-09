import SerializerMap from './serializer_map.es6';

// Serialize entities to JSON
// Фабрика. Создает инстанс сериалайзера.
export default (operation) => {
  const type  = operation.type.capitalize();
  const klass = SerializerMap[type];

  return new klass(operation);
}
