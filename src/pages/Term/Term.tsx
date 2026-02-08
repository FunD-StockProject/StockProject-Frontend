import { useNavigate, useSearchParams } from 'react-router-dom';
import { TermItem, TermKey, TermList } from '@ts/Term';
import Button from '@components/Common/Button';
import Header from '@components/Common/Header';
import {
  TermButtonContainer,
  TermContainer,
  TermContents,
  TermListContainer,
  TermListItemContainer,
  TermListItemContent,
  TermListItemTitle,
  TermListOl,
} from './Term.Style';

const RegisterTermList = ({ termItem }: { termItem: TermItem }) => {
  return (
    <>
      {termItem.text}
      {termItem.list && (
        <TermListOl listStyle={termItem.listStyle}>
          {termItem.list.map((item, index) => (
            <li key={`TERM_LIST_${index}`}>
              <RegisterTermList termItem={item} />
            </li>
          ))}
        </TermListOl>
      )}
    </>
  );
};

const RegisterTerm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const termKey = searchParams.get('term') as TermKey;

  const handleClose = () => {
    navigate(-1);
  };

  if (!termKey) return;

  const { title, name, contents } = TermList[termKey];

  return (
    <TermContainer>
      <Header title={title} beforeIconType="close" onBefore={handleClose} />
      <TermContents>
        <p>{name}</p>
        <TermListContainer>
          {contents.map((content, index) => (
            <TermListItemContainer key={`TERM_CONTENT_${index}`}>
              <TermListItemTitle>{content.title}</TermListItemTitle>
              <TermListItemContent>
                <RegisterTermList termItem={content} />
              </TermListItemContent>
            </TermListItemContainer>
          ))}
        </TermListContainer>
      </TermContents>
      <TermButtonContainer>
        <Button onClick={handleClose}>닫기</Button>
      </TermButtonContainer>
    </TermContainer>
  );
};

export default RegisterTerm;
