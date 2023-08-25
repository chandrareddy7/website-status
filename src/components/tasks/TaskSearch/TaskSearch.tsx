import { useState } from 'react';
import className from './tasksearch.module.scss';
import { TABS, Tab } from '@/interfaces/task.type';
import FilterModal from './FilterModal';

type TaskSearchProps = {
    dev?: boolean;
    onSelect: (tab: Tab) => void;
    inputValue: string;
    activeTab?: Tab;
    onInputChange: (value: string) => void;
    onClickSearchButton: () => void;
};

const TaskSearch = ({
    dev,
    onSelect,
    inputValue,
    activeTab,
    onInputChange,
    onClickSearchButton,
}: TaskSearchProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onClickSearchButton();
    };

    return (
        <div className={className['task-search-container']}>
            <div className={className['filter-container']}>
                <div
                    className={className['filter-button']}
                    onClick={handleModal}
                >
                    Filter
                    {modalOpen && (
                        <FilterModal
                            dev={dev}
                            tabs={TABS as Tab[]}
                            onSelect={onSelect}
                            activeTab={activeTab}
                            onClose={handleModal}
                        />
                    )}
                </div>

                <input
                    className={className['search-input']}
                    data-testid="search-input"
                    type="text"
                    placeholder="Eg: status:active assignee:sunny-s Build a feature"
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
            <div className={className['search-button-container']}>
                <button
                    className={className['search-button']}
                    data-testid="search-button"
                    onClick={onClickSearchButton}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default TaskSearch;
