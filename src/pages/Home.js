import React, {useState} from 'react';
import ActorGrid from '../components/actors/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import CustomRadio from '../components/CustomRadio';
import ShowGrid from '../components/show/ShowGrid';
import {apiGet} from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchInput, SearchButtonWrapper } from './Home.styled';

const Home = () => {

    const [input, setInput] = useLastQuery();
    const [results, setResults] = useState(null);
    const [searhOption, setSearchOption] = useState('shows');

    const isShowSearch = searhOption === 'shows';

    const onInputChange = e => {
      setInput(e.target.value);
    }

    const onSearch = () => {
       
      apiGet(`/search/${searhOption}?q=${input}`).then(result => setResults(result));       
    }

    const onKeyDown = e => {
        if(e.keyCode === 13){
            onSearch();
        }
    }

    const renderResults = () => {
      if(results && results.length === 0){
        return <div>No results</div>
      }

      if(results && results.length > 0){
        return results[0].show ? 
           (
            <ShowGrid data={results}/>
           ) 
         : (
            <ActorGrid data={results}/>
           )
      }

      return null;
    }

    const onRadioChange = e => {
      setSearchOption(e.target.value);
    }

    return (
        <MainPageLayout>
          <SearchInput type="text"
           onChange={onInputChange} 
           onKeyDown={onKeyDown} 
           value={input}
           placeholder='Search for Something'
           />

           <RadioInputsWrapper>
            
           <div>
              <CustomRadio
                label="Shows"
                id="shows-search"
                value="shows"
                checked={isShowSearch}
                onChange={onRadioChange}
              />
           </div>
 
            <div>
              <CustomRadio
                label="Actors"
                id="actors-search"
                value="people"
                checked={!isShowSearch}
                onChange={onRadioChange}
              />
            </div>
             
           </RadioInputsWrapper>

          <SearchButtonWrapper>
            <button type="button" onClick={onSearch}>Search</button> 
          </SearchButtonWrapper>
            
          {renderResults()}
        </MainPageLayout>
    )
}

export default Home
