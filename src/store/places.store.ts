import { reactive } from 'vue';
import { Place } from '@/types/client/place.interface';

interface Places {
  selected: null | number;
  all: Place[]
}

export const places = reactive<Places>({
  selected: null,
  all: [
    {
      id: 0,
      name: 'Музей истории со вкусом «Коломенская пастила»',
      description:
        'Музей истории со вкусом представляет собой новый тип музея — сохраняющего и предъявляющего нематериальное наследие, нечто эфемерное и ускользающее: вкусы, запахи, культуру бытования, манеру говорить.',
      address: 'Посадская ул., 13А',
      location: {
        lat: 55.104639830387946,
        lon: 38.76986736734893,
      },
      images: [
        {
          image: 'https://optim.tildacdn.com/tild3732-3266-4565-b661-646437333266/-/format/webp/opi-pas-08.jpg',
        },
        {
          image: 'https://static.tildacdn.com/tild6463-3737-4666-b138-623262346639/opi-a-04.jpg',
        },
        {
          image: 'https://static.tildacdn.com/tild6463-3737-4666-b138-623262346639/opi-a-03.jpg',
        },
      ],
    },
    {
      id: 1,
      name: 'Музей-резиденция «Арткоммуналка Ерофеев и Другие»',
      description:
        '«Арткоммуналка» — музей, рассказывающий о советской Коломне 1960-х годов, доносящий до нас черты коммунального быта, диссидентский дух эпохи хрущёвской оттепели. Музей расположен в самом центре Старой Коломны в доме, где в 1960-е годы находился продуктовый магазин «Огонёк» — в нём писатель Венедикт Ерофеев работал грузчиком в винном отделе. Здесь, в Коломне, Ерофеев оставил надежды получить высшее образование (Коломенский пединститут был его четвёртой и уже последней попыткой). Именно отсюда начался его «очень жизненный путь». Признанный гений творческой свободы Веня Ерофеев стал гением места музея-резиденции.',
      address: 'ул. Октяборьской Революции, д. 205',
      location: {
        lat: 55.10089492301357,
        lon: 38.756668281609194,
      },
      images: [
        {
          image: 'https://optim.tildacdn.com/tild3831-6332-4362-a531-636438353861/-/cover/620x460/center/center/-/format/webp/opi-a-03.jpg',
        },
        {
          image: 'https://optim.tildacdn.com/tild3035-3936-4330-a533-313536643638/-/format/webp/opi-pas-01.jpg',
        },
        {
          image: 'https://static.tildacdn.com/tild3731-3831-4663-b138-386539383733/opi-a-01.jpg',
        },
      ],
    },
    {
      id: 2,
      name: 'Музей «Калачная»',
      description:
        'Музей возрождает старинный городской калачный промысел. Главным объектом музейного показа является воссозданный по старинным руководствам процесс выпекания калачей. Искусство калачепечения, мастерство пекаря живёт на кончиках пальцев, это и есть уникальная технология, что являет собой нематериальное наследие.',
      address: 'ул. Зайцева, 14',
      location: {
        lat: 55.105796,
        lon: 38.763819,
      },
      images: [
        {
          image: 'https://optim.tildacdn.com/tild3264-3834-4635-a466-646134633665/-/cover/620x460/center/center/-/format/webp/kalach_03.jpg',
        },
        {
          image: 'https://optim.tildacdn.com/tild6131-3433-4235-a431-656130303630/-/cover/620x460/center/center/-/format/webp/kalach_04.jpg',
        },
        {
          image: 'https://optim.tildacdn.com/tild6133-3033-4337-b562-623263323461/-/cover/620x460/center/center/-/format/webp/kalach_05.jpg',
        },
      ],
    },
    {
      id: 3,
      name: 'Музей-Навигатор',
      description:
        'Музей-Навигатор расположен на стыке кремля и посада, у древних Пятницких ворот. Музейная коллекция Навигатора знакомит с артефактами, которые определили развитие города. Знакомство с раритетами начинается в музее, а продолжается и за его стенами – в «маршрутах времени» по исторической Коломне.',
      address: 'ул. Зайцева, 14',
      location: {
        lat: 55.105882,
        lon: 38.763518,
      },
      images: [
        {
          image: 'https://optim.tildacdn.com/tild3336-3863-4661-a663-633466343435/-/cover/620x460/center/center/-/format/webp/opi-mnav-03.jpg',
        },
        {
          image: 'https://optim.tildacdn.com/tild3564-3638-4539-a131-313130646631/-/cover/620x460/center/center/-/format/webp/opi-mnav-01.jpg',
        },
        {
          image: 'https://optim.tildacdn.com/tild6238-6465-4835-b537-303964393538/-/cover/620x460/center/center/-/format/webp/opi-mnav-02.jpg',
        },
      ],
    },
    {
      id: 4,
      name: 'Музей-лаборатория «Шелковая фабрика»',
      description:
        'Cовременное пространство на бывшей шёлковой фабрике купцов Левиных и Бабаевых первой половины XIX века. Сохранившееся здание сегодня объединяет в себе коворкинг, выставочный и конференц-зал, зарождающийся музей коломенского шёлкоткачества и лабораторию с открытым производством.',
      address: 'ул. Зайцева, 14',
      location: {
        lat: 55.100766,
        lon: 38.767005,
      },
      images: [
        {
          image: 'https://optim.tildacdn.com/tild6237-3364-4930-b337-623863356263/-/cover/620x460/center/center/-/format/webp/opi-sf-01.jpg',
        },
        {
          image: 'https://optim.tildacdn.com/tild3061-6538-4363-b136-646131376361/-/cover/620x460/center/center/-/format/webp/opi-sf-02.jpg',
        },
        {
          image: 'https://optim.tildacdn.com/tild3739-3661-4564-b131-356130353961/-/cover/620x460/center/center/-/format/webp/opi-sf-03.jpg',
        },
      ],
    },
  ]
});
