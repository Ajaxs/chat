import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillObject<T, V>(someDTO: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDTO, plainObject, {
    excludeExtraneousValues: true,
  });
}
