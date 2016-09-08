package main.models.chartDataModels;

/**
 * Created by kaxa on 9/8/16.
 */
public class ColumnChartKeyValue {
    private String name;
    private float sum;

    public ColumnChartKeyValue(String name, float sum) {
        this.name = name;
        this.sum = sum;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getSum() {
        return sum;
    }

    public void setSum(float sum) {
        this.sum = sum;
    }
}
