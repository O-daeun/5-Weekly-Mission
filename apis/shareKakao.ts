import React from 'react';

export default function shareKakao(
  e: React.MouseEvent,
  folderName: string,
  folderId: number
) {
  const url = window.location.hostname;
  const folderUrl = `${url}/share/${folderId}`;

  const { Kakao } = window;

  Kakao.cleanup();
  Kakao.init('d433130307621ad24713cbacf6a9f93b');

  const shareKakao = (e: React.MouseEvent) => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: folderName,
        description: `${folderName} 폴더 페이지입니다.`,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '확인해보기',
          link: {
            mobileWebUrl: folderUrl,
            webUrl: folderUrl,
          },
        },
      ],
    });
  };

  shareKakao(e);
}
