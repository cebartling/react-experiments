import { http, HttpHandler, HttpResponse } from 'msw';
import { DemographicsFormData } from '../types';

export default function GetUsersHandler(): HttpHandler {
  return http.get('https://api.example.com/users', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json([
      {
        id: 1,
        firstName: 'Kristoffer',
        lastName: 'Klaus',
        email: 'kris.klaus112@any-domain.com',
      } as DemographicsFormData,
      {
        id: 2,
        firstName: 'Connie',
        lastName: 'Clausen',
        email: 'connie.clausen@any-domain.com',
      } as DemographicsFormData,
      {
        id: 3,
        firstName: 'Catrina',
        lastName: 'Klasson',
        email: 'catrina.klasson@any-domain.com',
      } as DemographicsFormData,
    ]);
  });
}
