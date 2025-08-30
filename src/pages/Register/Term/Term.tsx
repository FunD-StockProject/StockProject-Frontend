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
          {termItem.list.map((item) => (
            <li>
              <RegisterTermList termItem={item} />
            </li>
          ))}
        </TermListOl>
      )}
    </>
  );
};

const RegisterTerm = ({ termKey, onClose }: { termKey: TermKey; onClose: () => void }) => {
  const { title, name, contents } = TermList[termKey];

  return (
    <TermContainer>
      <Header title={title} beforeIconType="close" onBefore={onClose} />
      <TermContents>
        <p>{name}</p>
        <TermListContainer>
          {contents.map((content) => (
            <TermListItemContainer>
              <TermListItemTitle>{content.title}</TermListItemTitle>
              <TermListItemContent>
                <RegisterTermList termItem={content} />
              </TermListItemContent>
            </TermListItemContainer>
          ))}
        </TermListContainer>
      </TermContents>
      <TermButtonContainer>
        <Button onClick={onClose}>닫기</Button>
      </TermButtonContainer>
    </TermContainer>
  );
};

export default RegisterTerm;
