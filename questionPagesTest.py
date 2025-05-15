import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


# Configure the test environment
@pytest.fixture(scope="module")
def driver():
    driver = webdriver.Chrome()
    yield driver
    driver.quit()


# Test the questionstart page
def test_question_start_page(driver):
    print("Testing the questionstart page...")
    driver.get("http://localhost:3000/questionstart")

    try:
        # Verify the title display
        welcome_title = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//h1[contains(text(), 'Congratulations! Welcome to the ANU Student Community!')]"))
        )
        assert welcome_title.is_displayed()

        # Verify the welcome image display
        welcome_image = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//img[@alt='Welcome']"))
        )
        assert welcome_image.is_displayed()

        # Verify the start button display and click it
        start_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), \"Let's Go Now!\")]"))
        )
        assert start_button.is_displayed()
        start_button.click()

        # Verify navigation to the questionbody page
        WebDriverWait(driver, 10).until(
            lambda driver: driver.current_url.endswith("/questionbody")
        )
        print("The questionstart page test succeeded.")
    except (AssertionError, TimeoutException):
        print("The questionstart page test failed.")
        raise


# Test the initial rendering
def test_initial_render(driver):
    print("Testing the initial rendering...")
    driver.get("http://localhost:3000/questionbody")

    try:
        # Verify the initial question display
        initial_question = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//h1[contains(text(), 'Which areas are you interested in?')]"))
        )
        assert initial_question.is_displayed()

        # Verify the category options display
        categories = driver.find_elements(By.CSS_SELECTOR, ".grid-cols-12 > div > div > div")
        assert len(categories) >= 9  # There should be 9 main categories
        print("The initial rendering test succeeded.")
    except AssertionError:
        print("The initial rendering test failed.")
        raise


# Test selecting the main category
def test_select_main_category(driver):
    print("Testing selecting the main category...")
    driver.get("http://localhost:3000/questionbody")

    try:
        # Select the Electronics category
        electronics = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//p[text()='Electronics']/parent::div"))
        )
        electronics.click()

        # Verify the selected state (background color change)
        assert "bg-[#2B7475]" in electronics.get_attribute("class")
        print("The main category selection test succeeded.")
    except AssertionError:
        print("The main category selection test failed.")
        raise


# Test navigating to subcategories
def test_navigate_to_subcategories(driver):
    print("Testing navigating to subcategories...")
    driver.get("http://localhost:3000/questionbody")

    try:
        # Select the Electronics category
        electronics = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//p[text()='Electronics']/parent::div"))
        )
        electronics.click()

        # Click the right arrow
        right_arrow = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//*[@alt='Right']"))
        )
        right_arrow.click()

        # Verify the subcategory question display
        sub_question = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located(
                (By.XPATH, "//h1[contains(text(), 'Which area of Electronics interests you?')]"))
        )
        assert sub_question.is_displayed()

        # Verify the subcategory options display
        subcategories = driver.find_elements(By.CSS_SELECTOR, ".grid-cols-12 > div > div > div")
        assert len(subcategories) >= 9  # Electronics has 9 subcategories
        print("The navigation to subcategories test succeeded.")
    except AssertionError:
        print("The navigation to subcategories test failed.")
        raise


# Test returning to main categories
def test_return_to_main_categories(driver):
    print("Testing returning to main categories...")
    driver.get("http://localhost:3000/questionbody")

    try:
        # Navigate to the subcategory page
        electronics = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//p[text()='Electronics']/parent::div"))
        )
        electronics.click()

        right_arrow = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//*[@alt='Right']"))
        )
        right_arrow.click()

        # Click the left arrow to return
        left_arrow = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//*[@alt='Left']"))
        )
        left_arrow.click()

        # Verify returning to main categories
        initial_question = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//h1[contains(text(), 'Which areas are you interested in?')]"))
        )
        assert initial_question.is_displayed()
        print("The return to main categories test succeeded.")
    except AssertionError:
        print("The return to main categories test failed.")
        raise


# Test completing the questionnaire and navigating to the result page
def test_complete_questionnaire(driver):
    print("Testing completing the questionnaire and navigating to the result page...")
    driver.get("http://localhost:3000/questionbody")

    try:
        # Select the Electronics category
        electronics = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//p[text()='Electronics']/parent::div"))
        )
        electronics.click()

        # Click the right arrow to enter subcategories
        right_arrow = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//*[@alt='Right']"))
        )
        right_arrow.click()

        # Select the Computers subcategory
        computers = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//p[text()='Computer']/parent::div"))
        )
        computers.click()

        # Click the right arrow again to complete the questionnaire
        right_arrow = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//*[@alt='Right']"))
        )
        right_arrow.click()

        # Verify navigating to the result page (assuming the URL changes)
        WebDriverWait(driver, 10).until(
            lambda driver: driver.current_url.endswith("/questionend")
        )
        print("The questionnaire completion and navigation to the result page test succeeded.")
    except TimeoutException:
        print("The questionnaire completion and navigation to the result page test failed.")
        raise


# Test the progress bar update
def test_progress_bar(driver):
    print("Testing the progress bar update...")
    driver.get("http://localhost:3000/questionbody")

    try:
        # Check the initial progress bar (50%)
        progress_bar = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".bg-gray-300 > div"))
        )
        assert "50%" in progress_bar.get_attribute("style")

        # Navigate to the subcategory page
        electronics = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//p[text()='Electronics']/parent::div"))
        )
        electronics.click()

        right_arrow = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//*[@alt='Right']"))
        )
        right_arrow.click()

        # Check the progress bar update to 100%
        progress_bar = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".bg-gray-300 > div"))
        )
        assert "100%" in progress_bar.get_attribute("style")
        print("The progress bar update test succeeded.")
    except AssertionError:
        print("The progress bar update test failed.")
        raise


# Test the skip functionality
def test_skip_functionality(driver):
    print("Testing the skip functionality...")
    driver.get("http://localhost:3000/questionbody")

    try:
        # Click the skip link
        skip_link = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//u[text()='Skip']"))
        )
        skip_link.click()

        # Verify navigating to the result page
        WebDriverWait(driver, 10).until(
            lambda driver: driver.current_url.endswith("/questionend")
        )
        print("The skip functionality test succeeded.")
    except TimeoutException:
        print("The skip functionality test failed.")
        raise


# Test case that reported an error before, also modified
@pytest.mark.parametrize("main_category", ["Sports", "Art & Music", "Movies", "Travel", "Reading", "Health", "Food", "Others"])
def test_select_other_main_category(driver, main_category):
    print(f"Testing selecting the main category: {main_category}...")
    driver.get("http://localhost:3000/questionbody")

    try:
        # Select the main category
        category = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"//p[text()='{main_category}']/parent::div"))
        )
        category.click()

        # Verify the selected state (background color change)
        assert "bg-[#2B7475]" in category.get_attribute("class")

        # Click the right arrow
        right_arrow = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//*[@alt='Right']"))
        )
        right_arrow.click()
        print(f"The selection of main category {main_category} test succeeded.")
    except AssertionError:
        print(f"The selection of main category {main_category} test failed.")
        raise