export const initialData = {
    boards: [
        {
            id : 'board-1',
            columnOrder : ['column-1' , 'column-2' , 'column-3'], // sắp xếp các vị trí 
            columns : [
               {
                  id : 'column-1',
                  boardId : "board-1",
                  title : 'column todo1', 
                  cardOrder : ['card-1' , 'card-2' , 'card-3'],
                  cards : [
                     {id : 'card-1', boardId : 'board-1',columnId : 'column-1',title : 'Title of card 1',cover : 'https://images.ctfassets.net/rz1oowkt5gyp/7pYWhpQ3vnntxoShaImNws/24181e476913df1dacc1690518ee54e7/trello_1_vi.png'},
                     {id : 'card-2', boardId : 'board-1',columnId : 'column-1',title : 'Title of card 2',cover : null},
                     {id : 'card-3', boardId : 'board-1',columnId : 'column-1',title : 'Title of card 3',cover : null}
                  ]
               },
               {
                id : 'column-2',
                boardId : "board-1",
                title : ' column todo2', 
                cardOrder : ['card-4' , 'card-5' , 'card-6'],
                  cards : [
                     {id : 'card-4', boardId : 'board-1',columnId : 'column-2',title : 'Title of card 4',cover : 'https://images.ctfassets.net/rz1oowkt5gyp/7pYWhpQ3vnntxoShaImNws/24181e476913df1dacc1690518ee54e7/trello_1_vi.png'},
                     {id : 'card-5', boardId : 'board-1',columnId : 'column-2',title : 'Title of card 5',cover : null },
                     {id : 'card-6', boardId : 'board-1',columnId : 'column-2',title : 'Title of card 6',cover : null },
                  ]
               },
               {
                  id : 'column-3',
                  boardId : "board-1",
                  title : ' column todo3', 
                  cardOrder : ['card-7' , 'card-8' , 'card-9'],
                    cards : [
                       {id : 'card-7', boardId : 'board-1',columnId : 'column-2',title : 'Title of card 7',cover : null},
                       {id : 'card-8', boardId : 'board-1',columnId : 'column-2',title : 'Title of card 8',cover : null },
                       {id : 'card-9', boardId : 'board-1',columnId : 'column-2',title : 'Title of card 9',cover : null},
                    ]
                 },
                 
            ],

         }
    ]
}